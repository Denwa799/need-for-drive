import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Map, Placemark, YMaps, ZoomControl } from 'react-yandex-maps';
import { IAppMap, PlacemarkClickHandlerType } from './type';

const API_KEY = process.env.REACT_APP_MAP_API;

const AppMap: FC<IAppMap> = ({
  points,
  debouncedCityValue,
  debouncedPointValue,
  setActivePointAddress,
  setActivePointCity,
  setCityValue,
  setPointValue,
}) => {
  // Стейт для объекта яндекс карты
  const [map, setMap] = useState<any>();

  // Стейт для map
  const [zoom, setZoom] = useState(3);
  const [coordinates, setCoordinates] = useState([55.75, 37.57]);
  const mapState = { center: coordinates, zoom };

  // Копирую массив, чтобы небыло мутации
  const pointsWithCoordinates = useMemo(() => {
    return [...points];
  }, [points]);

  // Функция берет координаты из адреса и вставляет в объект для отображения placemark
  const getGeoLocation = useCallback(() => {
    if (map) {
      pointsWithCoordinates.forEach(function (element) {
        const response = map.geocode(`${element.cityId!.name}, ${element.address}`);
        // Нельзя дать конкретный тип, так как ответ - geoObject из yandex map api
        response.then((result: any) => {
          element.coordinate = result.geoObjects.get(0).geometry.getCoordinates();
        });
      });
    }
  }, [map, pointsWithCoordinates]);

  // Вызывает функцию getGeoLocation в момент, когда объект карты появится / сменятся points
  useEffect(() => {
    getGeoLocation();
  }, [map, points, pointsWithCoordinates]);

  // При наличии города и адреса устанавливает карту карту в нужные координаты
  useEffect(() => {
    if (map && (debouncedCityValue || debouncedPointValue)) {
      map.geocode(`${debouncedCityValue}, ${debouncedPointValue}`).then((result: any) => {
        const currentCoordinates = result.geoObjects.get(0).geometry.getCoordinates();
        setCoordinates(currentCoordinates);
        setZoom(10);
      });
    }
  }, [map, debouncedCityValue, debouncedPointValue]);

  const clickHandler = useCallback<PlacemarkClickHandlerType>(
    (address, city, cord) => {
      setActivePointAddress(address);
      setActivePointCity(city);
      setCityValue(city);
      setPointValue(address);
      setCoordinates(cord);
    },
    [pointsWithCoordinates]
  );

  return (
    <YMaps
      query={{
        apikey: API_KEY,
      }}
      modules={['geocode']}
    >
      <Map
        state={mapState}
        width="100%"
        height="100%"
        modules={['geocode', 'layout.ImageWithContent']}
        onLoad={setMap}
      >
        {pointsWithCoordinates.map((point) => {
          return (
            <Placemark
              key={point.id}
              geometry={point.coordinate}
              properties={{ iconCaption: point.name }}
              onClick={(e: React.MouseEvent) =>
                clickHandler(point.address!, point.cityId!.name, point.coordinate!)
              }
              options={{ iconColor: '#0EC261' }}
            />
          );
        })}
        <ZoomControl options={{ float: 'left' }} />
      </Map>
    </YMaps>
  );
};

export { AppMap };
