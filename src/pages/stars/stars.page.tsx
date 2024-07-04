import { useEffect, useState } from "react";
import Select from "react-select";
import "./stars.page.scss";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { fetchAllPlanets, fetchPlanetById } from "../../users/planetSlice";
import * as _ from "underscore";
export const StarsPage = () => {
  const dispatch = useAppDispatch();
  const { planets, selectedPlanet } = useAppSelector(
    (state: any) => state.planets
  );

  useEffect(() => {
    dispatch(fetchAllPlanets());
  }, []);

  useEffect(() => {
    if (planets?.length) {
      setOptions(
        planets.map(({ name, url }: any) => {
          return {
            value: url,
            label: name,
          };
        })
      );
    }
  }, [planets]);

  const [options, setOptions] = useState([]);
  const [selectedItem, setSelectedItem] = useState<any>();

  const [star, setStar] = useState<any>();

  useEffect(() => {
    setStar(selectedPlanet);
  }, [selectedPlanet]);

  const handleChange = ({ value }: any) => {
    setSelectedItem(value);
    let id = _.last(value.split("/"));
    dispatch(fetchPlanetById(id));
  };

  return (
    <div className="stars-container ">
      <h3 className="mb-3"> Planets</h3>
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
                <div className="list-group-item"> {star?.name}</div>
                <div className="list-group-item"> {star?.climate}</div>
                <div className="list-group-item"> {star?.terrain}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
