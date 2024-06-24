import styled from "styled-components";
import animalData from "../assets/animalData.json";
import { CountList } from "../types";
import { useState } from "react";
import HomeButton from "./common/HomeButton";

const targetData = animalData;

const TaskTwo = () => {
  // select에 표시 할 값을 담는 state
  const [selectedOption, setSelectedOption] = useState<string[]>(targetData.data.titleList.map(() => ""));

  // 해당 select를 활성화 하기 위한 state
  const [selected, setSelected] = useState<boolean[]>(
    selectedOption.map((_, index) => {
      return index === 0 ? true : false;
    })
  );

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const { value } = e.target;

    // 선택한 select의 index에 value를 설정
    selectedOption[index] = value;
    setSelectedOption([...selectedOption]);

    // 다음 select를 활성화
    selected[index + 1] = true;
    setSelected([...selected]);

    // 이전 선택이 변경되면 나머지 선택 초기화
    if (index < selectedOption.length - 1) {
      // 선택한 select 다음의 모든 select를 false로 비활성화
      const newSelected = [...selected];
      for (let i = index + 1; i < newSelected.length - 1; i++) {
        newSelected[i] = false;
      }
      newSelected[index + 1] = true;
      setSelected([...newSelected]);

      // 선택한 option 다음의 모든 option을 ""로 초기화
      const newSelectedOption = [...selectedOption];
      for (let i = index + 1; i < newSelectedOption.length; i++) {
        newSelectedOption[i] = "";
      }
      setSelectedOption(newSelectedOption);
    }
  };

  // 단계 별로 남은 수량을 return하는 함수
  const getRemainCount = (countList: CountList[], option: string, index: number): number => {
    let count = 0;

    // countList의 모든 combination을 체크하기 위한 반복문
    countList.forEach((countListItem) => {
      // 지금까지 선택한 option들과 지금 선택한 option을 하나의 배열로 병합
      const checkedOptions = selectedOption.slice(0, index).concat(option);

      // 체크한 배열의 모든 요소가 들어있는 combination을 찾기 위한 조건문
      if (checkedOptions.every((item) => countListItem.combination.includes(item))) {
        count += countListItem.remainCount;
      }
    });
    return count;
  };

  return (
    <Container>
      <HomeButton />
      <Box>
        {targetData.data.groupList.map((group, index) => (
          <Select key={index} id={group.title} name={group.title} value={selectedOption[index]} onChange={(e) => handleSelect(e, index)} disabled={!selected[index]}>
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
        <SelectedResult>{selectedOption.every((item) => item !== "") && selectedOption.join(" / ")}</SelectedResult>
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
  marginTop: 100,
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
  height: 40,
  padding: 8,
  borderRadius: 10,
  cursor: "pointer",
});

const Option = styled("option")({
  backgroundColor: "lightgrey",
});

const SelectedResult = styled("div")({
  paddingBottom: 20,
});
