import React, { FC, useEffect, useState } from 'react';
import { Map, Placemark, YMaps, ZoomControl } from 'react-yandex-maps';
import { IPoints } from './type';

const API_KEY = process.env.REACT_APP_MAP_API;

const AppMap: FC<IPoints> = ({
  points,
  setActivePointAddress,
  setActivePointCity,
  setCityValue,
  setPointValue,
}) => {
  // Стейт для объекта яндекс карты
  // any необходим, так как сюда приходит объект яндекс карты
  const [maps, setMaps] = useState<any>();

  // Стейт для zoom и координат для карты
  const [zoom, setZoom] = useState(4);
  const [coordinates, setCoordinates] = useState([55.75, 37.57]);
  const mapState = { center: coordinates, zoom };

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
  }, [maps, points]);

  const clickHandler = (address: string, city: string, cord: number[]) => {
    setActivePointAddress(address);
    setActivePointCity(city);
    setCityValue(city);
    setPointValue(address);
    setCoordinates(cord);
  };

  // Костыль, в котором меняется стейт зума через две секунды для отрисовки координат с сервера
  const changeZoom = () => {
    setZoom(3);
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
                  onClick={(e: React.MouseEvent) =>
                    clickHandler(point.address!, point.cityId!.name, point.coordinate!)
                  }
                  options={{ iconColor: '#0EC261' }}
                />
              );
            })
          : null}
        <ZoomControl options={{ float: 'right' }} />
      </Map>
    </YMaps>
  );
};

export { AppMap };
