import Triangle from "../Triangle";

interface Props {
  counter: number;
}

const BottomLeft = (props: Props) => {
  return (
    <div>
      <Triangle counter={props.counter} position="BottomLeft" />
    </div>
  );
};

export default BottomLeft;
