import Triangle from "../Triangle";

interface Props {
  counter: number;
}

const BottomRight = (props: Props) => {
  return (
    <div>
      <Triangle counter={props.counter} position="BottomRight" />
    </div>
  );
};

export default BottomRight;
