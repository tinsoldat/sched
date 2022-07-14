import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Liver } from "../../../components/Liver";
import { ILiver } from "../../../contexts/LiversContext";
import { selectFilteredByName, toggle } from "../filterSlice";

export const Button = ({ liver }: { liver: ILiver }) => {
  const dispatch = useAppDispatch();
  const isActive = useAppSelector(state => selectFilteredByName(state, liver.name));
  
  return (
    <div className={'filter__btn btn' + (isActive ? ' checked' : '')}
      title={liver.name}
      style={{ '--theme-color': liver.color } as React.CSSProperties}
      onClick={() => dispatch(toggle(liver.name))}
    >
      <Liver liver={liver} />
    </div>
  );
}