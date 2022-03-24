import React, { FC, useEffect, useState } from 'react';
import { Map, Placemark, YMaps } from 'react-yandex-maps';

const API_KEY = process.env.REACT_APP_MAP_API;

interface IPoints {
  points: {
    address?: string;
    cityId?: {
      id: string;
      name: string;
    };
    id?: string;
    name?: string;
    coordinate?: number[];
  }[];
  setActivePoint: (value: string) => void;
}

const AppMap: FC<IPoints> = ({ points, setActivePoint }) => {
  // Стейт для объекта яндекс карты
  // any необходим, так как сюда приходит объект яндекс карты
  const [maps, setMaps] = useState<any>();

  // Временное решение по смене zoom для перерендеринга карты
  const [zoom, setZoom] = useState(4);
  const mapState = { center: [55.75, 37.57], zoom };

  // Были ли внесены координаты в объект или нет
  const [isCoordinate, setIsCoordinate] = useState(false);

  // При загрузке добавить объект яндекс карты в локальный стейт
  const onLoad = (map: any) => {
    setMaps(map);
  };

  // Копирую массив, чтобы небыло мутации
  const pointsWithCoordinates = [...points];

  // Функция берет координаты из адреса
  const getGeoLocation = () => {
    if (maps) {
      pointsWithCoordinates.forEach(function (element) {
        const resp = maps.geocode(`${element.cityId!.name}, ${element.address}`);
        // Нельзя дать конкретный тип, так как ответ - geoObject из yandex map api
        resp.then((res: any) => {
          element.coordinate = res.geoObjects.get(0).geometry.getCoordinates();
        });
        setIsCoordinate(true);
      });
    }
  };

  // Вызывает функцию getGeoLocation в момент, когда объект карты появится
  useEffect(() => {
    getGeoLocation();
  }, [maps]);

  const clickHandler = (address: string) => {
    setActivePoint(address);
  };

  // Костыль, в котором меняется стейт зума через две секунды для отрисовки координат с сервера
  const changeZoom = () => {
    setZoom(5);
  };
  useEffect(() => {
    setTimeout(changeZoom, 2000);
  }, [isCoordinate]);

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
        onLoad={(ymaps) => onLoad(ymaps)}
      >
        {isCoordinate
          ? pointsWithCoordinates.map((point) => {
              return (
                <Placemark
                  key={point.id}
                  geometry={point.coordinate}
                  properties={{ iconCaption: point.name }}
                  onClick={(e: React.MouseEvent) => clickHandler(point.address!)}
                />
              );
            })
          : null}
      </Map>
    </YMaps>
  );
};

export { AppMap };
