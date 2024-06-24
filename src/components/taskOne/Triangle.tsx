interface Props {
  counter: number;
  position: string;
}

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

export default Triangle;
