import React, { FC, Ref, useCallback, useEffect, useState } from 'react';
import { Map, Placemark, YMaps } from 'react-yandex-maps';

const API_KEY = process.env.REACT_APP_MAP_API;

const AppMap: FC = () => {
  // Стейт для объекта яндекс карты
  // any необходим, так как сюда приходит объект яндекс карты
  const [maps, setMaps] = useState<any>();

  // Стейт для координат
  const [coordinate, setCoordinate] = useState();

  // При загрузке добавить объект яндекс карты в локальный стейт
  const onLoad = (map: any) => {
    setMaps(map);
  };

  // Функция берет координаты из адреса
  const getGeoLocation = () => {
    if (maps) {
      const resp = maps.geocode('Уфа, ул. Чернышевского, д. 88');
      resp.then((res: any) => {
        setCoordinate(res.geoObjects.get(0).geometry.getCoordinates());
      });
    }
  };

  // Вызывает функцию getGeoLocation в момент, когда объект карты появится
  useEffect(() => {
    getGeoLocation();
  }, [maps]);

  console.log(coordinate);

  return (
    <YMaps
      query={{
        apikey: API_KEY,
      }}
    >
      <Map
        defaultState={{ center: [55.75, 37.57], zoom: 4 }}
        width="100%"
        height="100%"
        modules={['geocode']}
        onLoad={(ymaps) => onLoad(ymaps)}
      >
        <Placemark geometry={coordinate} />
      </Map>
    </YMaps>
  );
};

export { AppMap };
