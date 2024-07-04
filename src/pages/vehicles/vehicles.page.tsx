import { useEffect, useState } from "react";
import Select from "react-select";
import * as _ from "underscore";
import { useAppDispatch, useAppSelector } from "../../app/store";
import {
  fetchAllVehicles,
  fetchAllVehiclesById,
} from "../../users/vehicleSlice";
import "./vehicles.page.scss";

export const VehiclesPage = () => {
  const dispatch = useAppDispatch();
  const { vehicles, selectedVehicle } = useAppSelector(
    (state: any) => state.vehicle
  );

  useEffect(() => {
    dispatch(fetchAllVehicles());
  }, []);

  useEffect(() => {
    if (vehicles?.length) {
      setOptions(
        vehicles.map(({ name, url }: any) => {
          return {
            value: url,
            label: name,
          };
        })
      );
    }
  }, [vehicles]);

  const [options, setOptions] = useState([]);
  const [selectedItem, setSelectedItem] = useState<any>();

  const [star, setStar] = useState<any>();

  useEffect(() => {
    setStar(selectedVehicle);
  }, [selectedVehicle]);

  const handleChange = ({ value }: any) => {
    setSelectedItem(value);
    let id = _.last(value.split("/"));
    dispatch(fetchAllVehiclesById(id));
  };

  return (
    <div className="stars-container ">
      <h3 className="mb-3"> Films</h3>
      <div className="container-fluid p-0">
        <div className="card">
          <div className="card-header">
            <Select
              className="basic-single"
              classNamePrefix="select"
              isDisabled={false}
              isLoading={false}
              isClearable={false}
              isSearchable={true}
              name="color"
              options={options}
              onChange={handleChange}
            />
          </div>
          <div className="card-body px-0">
            {star && (
              <div className="list-group">
                <div className="list-group-item"> {star?.model}</div>
                <div className="list-group-item"> {star?.name}</div>
                <div className="list-group-item"> {star?.vehicle_class}</div>
                <div className="list-group-item"> {star?.cost_in_credits}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
