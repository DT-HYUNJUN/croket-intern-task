import styled from "styled-components";
import animalData from "../assets/animalData.json";
import { CountList } from "../types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const targetData = animalData;

const TaskTwo = () => {
  // select에 표시 할 값을 담는 state
  const [titleList, setTitleList] = useState<string[]>(targetData.data.titleList.map(() => ""));

  // 해당 select를 활성화 하기 위한 state
  const [selected, setSelected] = useState<boolean[]>(
    titleList.map((_, index) => {
      return index === 0 ? true : false;
    })
  );

  // reaminCount를 계산하기 위해 현재까지 선택한 combi를 담는 state
  const [selectedCombi, setSelectedCombi] = useState<string[]>([]);

  useEffect(() => {
    console.log(`titleList: ${titleList}`);
    console.log(`selected: ${selected}`);
    console.log(`selectedCombi: ${selectedCombi}`);
    console.log("-----------------");
  }, [titleList, selected, selectedCombi]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const { value } = e.target;
    titleList[index] = value;
    setTitleList([...titleList]);

    // 초기화하고 현재 선택한 값을 설정
    const newSelectedCombi = [...selectedCombi];
    newSelectedCombi[index] = value;
    setSelectedCombi(newSelectedCombi.filter(Boolean));
    selected[index + 1] = true;
    setSelected([...selected]);

    // 이전 선택이 변경되면 나머지 선택 초기화
    if (index < selectedCombi.length - 1) {
      console.log("초기화");
      const newSelected = [...selected];
      for (let i = index + 1; i < newSelected.length - 1; i++) {
        newSelected[i] = false;
      }
      newSelected[index + 1] = true;
      setSelected([...newSelected]);

      const newTitleList = [...titleList];
      for (let i = index + 1; i < newTitleList.length; i++) {
        newTitleList[i] = "";
      }
      setTitleList(newTitleList);

      setSelectedCombi(newSelectedCombi.slice(0, index + 1));
    }
  };

  //
  const getRemainCount = (countList: CountList[], option: string, index: number): number => {
    let count = 0;
    countList.forEach((countListItem) => {
      const temp = selectedCombi.slice(0, index).concat(option);
      if (temp.every((item) => countListItem.combination.includes(item))) {
        count += countListItem.remainCount;
      }
    });
    return count;
  };

  return (
    <Container>
      <LinkButton to="/">홈</LinkButton>
      <Box>
        {targetData.data.groupList.map((group, index) => (
          <Select key={index} id={group.title} name={group.title} value={titleList[index]} onChange={(e) => handleSelect(e, index)} disabled={!selected[index]}>
            <Option disabled value="">
              {group.title}
            </Option>
            {targetData.data.groupList[index].options.map((option) => (
              <Option key={option} value={option} disabled={getRemainCount(targetData.data.countList, option, index) === 0}>
                {`${option} ${
                  getRemainCount(targetData.data.countList, option, index) === 0
                    ? "(품절)"
                    : index === targetData.data.groupList.length - 1
                    ? `(${getRemainCount(targetData.data.countList, option, index)}개 남았습니다)`
                    : ""
                }`}
              </Option>
            ))}
          </Select>
        ))}
        <SelectedResult>{selectedCombi.length === targetData.data.titleList.length && titleList.join(" / ")}</SelectedResult>
        {/* <SelectedResult>{selected.every((value) => value === true) && titleList.join(" / ")}</SelectedResult> */}
      </Box>
    </Container>
  );
};

export default TaskTwo;

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 200,
  gap: 20,
});

const Box = styled("div")({
  width: 420,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 20,
  paddingTop: 20,
  border: "1px solid grey",
  borderRadius: 10,
  backgroundColor: "#f7f7f7",
});

const Select = styled("select")({
  width: 300,
  padding: 8,
});

const Option = styled("option")({
  backgroundColor: "lightgrey",
});

const SelectedResult = styled("div")({
  paddingBottom: 20,
});

const LinkButton = styled(Link)({
  color: "white",
  textDecoration: "none",
  padding: "16px 24px",
  borderRadius: 10,
  backgroundColor: "black",
});
