import { useAppDispatch } from "../../../app/hooks";
import { ILiver } from "../../../contexts/LiversContext";
import { toggle } from "../filterSlice";
import { Button } from "./FilterButton";

interface UnitProps {
  unit: string;
  members: ILiver[];
}

export const Unit = ({ unit, members }: UnitProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="filter__groups-container" key={unit}>
      <h3 className='secondary unit-name' onClick={() => dispatch(toggle(...members.map(member => member.name)))}>
        {unit.replace(/^_.+/, members.map(({ name }: ILiver) => name).join('、'))}
      </h3>
      <div className="filter__group" key={unit} data-group={unit}>
        {members.map((member: ILiver) =>
          <Button key={member.name} liver={member} />)
        }
      </div>
    </div>
  )
}