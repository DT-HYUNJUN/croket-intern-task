import Triangle from "../Triangle";

interface Props {
  counter: number;
}

const TopRight = (props: Props) => {
  return (
    <div>
      <Triangle counter={props.counter} position="TopRight" />
    </div>
  );
};

export default TopRight;
