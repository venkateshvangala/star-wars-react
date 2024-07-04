import { useEffect, useState } from "react";
import Select from "react-select";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { fetchAllFilms, fetchFilmsById } from "../../users/filmsSlice";
import "./films.page.scss";
import * as _ from "underscore";

export const FilmsPage = () => {
  const dispatch = useAppDispatch();
  const { films, selectedFilm } = useAppSelector((state: any) => state.films);

  useEffect(() => {
    dispatch(fetchAllFilms());
  }, []);

  useEffect(() => {
    if (films?.length) {
      setOptions(
        films.map(({ title, url }: any) => {
          return {
            value: url,
            label: title,
          };
        })
      );
    }
  }, [films]);

  const [options, setOptions] = useState([]);
  const [selectedItem, setSelectedItem] = useState<any>();

  const [star, setStar] = useState<any>();

  useEffect(() => {
    setStar(selectedFilm);
  }, [selectedFilm]);

  const handleChange = ({ value }: any) => {
    setSelectedItem(value);
    let id = _.last(value.split("/"));
    dispatch(fetchFilmsById(id));
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
                <div className="list-group-item"> {star?.episode_id}</div>
                <div className="list-group-item"> {star?.title}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
