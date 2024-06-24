# 와이오엘오 일경험 인턴 채용 과제

## 과제 1: react를 활용한 화면 구현

바람개비를 출력하는 부분을 **네 개의 삼각형**으로 나누어 합치는 방식으로 진행했습니다.

**position**은 각각

- TopLeft
- TopRight
- BottomLeft
- BottomRight

입니다.

### Position (나머지 삼각형도 동일)

```tsx
const TopLeft = (props: Props) => {
  return (
    <div>
      <Triangle counter={props.counter} position="TopLeft" />
    </div>
  );
};
```

각 삼각형은 **Triangle** 컴포넌트를 통해 화면에 출력합니다.

### Triangle

```tsx
const Triangle = (props: Props) => {
  const result = [];

  for (let i = 0; i < props.counter; i++) {
    const row = [];

    for (let j = 0; j < props.counter; j++) {
      let condition: boolean;

      switch (props.position) {
        case "TopLeft":
          condition = j - i >= 0;
          break;
        case "TopRight":
          condition = i + j >= props.counter - 1;
          break;
        case "BottomLeft":
          condition = i + j < props.counter;
          break;
        case "BottomRight":
          condition = i - j >= 0;
          break;
        default:
          condition = false;
      }

      if (condition) {
        row.push(<span key={`star-${i}-${j}`}>⭐</span>);
      } else {
        row.push(<span key={`air-${i}-${j}`}>🌑</span>);
      }
    }

    result.push(<div key={`row-${i}`}>{row}</div>);
  }
  return result;
};
```

- counter만큼의 이중 반복문 안에 각 position에 따른 조건문을 switch 문법으로 선택하게끔 만들었습니다.
- 해당 조건이 참과 거짓일 때를 나누어 ⭐과 🌑로 화면에 삼각형을 출력했습니다.

### Display

```tsx
<TriangleBox>
  <TopLeft counter={counter} />
  <TopRight counter={counter} />
</TriangleBox>
<TriangleBox>
  <BottomLeft counter={counter} />
  <BottomRight counter={counter} />
</TriangleBox>
```

`TopLeft`와 `TopRight`를 `flex`로묶고, `BottomLeft`와 `BottomRight`를 마찬가지로 `flex`로 묶었습니다.

## 과제 2: react를 활용한 Selection 구현

### State

```tsx
const [selectedOption, setSelectedOption] = useState<string[]>(targetData.data.titleList.map(() => ""));

const [selected, setSelected] = useState<boolean[]>(
  selectedOption.map((_, index) => {
    return index === 0 ? true : false;
  })
);
```

1. 선택할 값을 담기 위한 state를 배열을 통해 선언했습니다.
2. 각 depth의 select를 활성화 하기 위한 state를 boolean 배열로 선언했습니다.
   1. 첫 select는 활성화 되어있는 상태이기 때문에 `index === 0` 은 true로 선언했습니다.

### Select & Option

```tsx
{
  targetData.data.groupList.map((group, index) => (
    <select>
      <option>{group.title}</option>
      {targetData.data.groupList[index].options.map((option) => (
        <option>{option}</option>
      ))}
    </select>
  ));
}
```

`data.groupList` 배열을 통해 select를 만들고, `data.groupList[index].options`으로 option을 만들었습니다.

### handleSelect

```tsx
const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const { value } = e.target;

    // 1. 선택한 select의 index에 value를 설정
    selectedOption[index] = value;
    setSelectedOption([...selectedOption]);

    // 2. 다음 select를 활성화
    selected[index + 1] = true;
    setSelected([...selected]);

    // 3. 이전 선택이 변경되면 나머지 선택 초기화
    if (index < selectedOption.length - 1) {

	    // 3.1. 선택한 select 다음의 모든 select를 false로 비활성화
      const newSelected = [...selected];
      for (let i = index + 1; i < newSelected.length - 1; i++) {
        newSelected[i] = false;
      }
      newSelected[index + 1] = true;
      setSelected([...newSelected]);

			// 3.2. 선택한 option 다음의 모든 option을 ""로 초기화
      const newSelectedOption = [...selectedOption];
      for (let i = index + 1; i < newSelectedOption.length; i++) {
        newSelectedOption[i] = "";
      }
      setSelectedOption(newSelectedOption);
  };
```

1. 선택한 select에 해당하는 value를 `selectedOption`에 반영합니다.
2. 다음 select를 활성화 하기 위해 `index+1` 의 select를 `true`로 활성화합니다.
3. 만약 이전 선택이 변경된다면 나머지 선택을 초기화 하기 위해 다음 단계를 거칩니다.
   1. 선택한 select 다음의 모든 select를 비활성화 하기 위해 `false`로 변경합니다.
   2. 선택한 option 다음의 모든 option을 초기화 하기 위해 `“”`로 변경합니다.

### getRemainCount

```tsx
const getRemainCount = (countList: CountList[], option: string, index: number): number => {
  // 1. return할 count를 담기 위한 변수
  let count = 0;

  // 2. countList의 모든 combination을 체크하기 위한 반복문
  countList.forEach((countListItem) => {
    // 3. 지금까지 선택한 option들과 지금 선택한 option을 하나의 배열로 병합
    const checkedOptions = selectedOption.slice(0, index).concat(option);

    // 4. 체크한 배열의 모든 요소가 들어있는 combination을 찾기 위한 조건문
    if (checkedOptions.every((item) => countListItem.combination.includes(item))) {
      // 5. 만약 참이라면 remainCount를 누적
      count += countListItem.remainCount;
    }
  });

  // 6. 합한 count를 return
  return count;
};
```

1. remainCount를 합한 count를 담기 위한 변수입니다.
2. countList에 있는 모든 combination을 체크하기 위한 반복문입니다.
3. 지금까지 선택한 option들이 있는 `selectedOption.slice(0, index)`와 현재 select에 있는 `option`을 `concat()` 으로 병합합니다.
4. 체크한 요소가 담긴 배열의 모든 요소들이 combination에 있는지 찾기위해 `every()` 메서드를 통해 체크합니다.
5. 만약 참이라면 remainCount를 누적합니다.
6. 누적값이 있는 count를 return합니다.
