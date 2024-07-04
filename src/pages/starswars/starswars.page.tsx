import { useEffect, useState } from "react";
import Select from "react-select";
import * as _ from "underscore";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { fetchAllStars, fetchStarById } from "../../users/appSlice";
import "./starswars.page.scss";

export const StarsWarsPage = () => {
  const dispatch = useAppDispatch();
  const { starwars, selectedStar } = useAppSelector((state: any) => state.app);

  useEffect(() => {
    dispatch(fetchAllStars());
  }, []);

  useEffect(() => {
    if (starwars?.length) {
      setOptions(
        starwars.map(({ name, url }: any) => {
          return {
            value: url,
            label: name,
          };
        })
      );
    }
  }, [starwars]);

  const [options, setOptions] = useState([]);
  const [selectedItem, setSelectedItem] = useState<any>();

  const [star, setStar] = useState<any>();

  useEffect(() => {
    setStar(selectedStar);
  }, [selectedStar]);

  const handleChange = ({ value }: any) => {
    setSelectedItem(value);
    let id = _.last(value.split("/"));
    dispatch(fetchStarById(id));
  };

  return (
    <div className="stars-container ">
      <h3 className="mb-3"> Star Wars</h3>
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
                <div className="list-group-item"> {star?.birth_year}</div>
                <div className="list-group-item"> {star?.height}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
