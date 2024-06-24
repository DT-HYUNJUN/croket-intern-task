import Triangle from "../Triangle";

interface Props {
  counter: number;
}

const TopLeft = (props: Props) => {
  return (
    <div>
      <Triangle counter={props.counter} position="TopLeft" />
    </div>
  );
};

export default TopLeft;
