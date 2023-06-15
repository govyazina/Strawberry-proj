/* eslint-disable max-len */
import React, { useState } from 'react';
import {
  Select, Button, Space, Carousel, Col, Row,
} from 'antd';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import useProductList from '../../hooks/useProductList';
import styles from './bouquet.module.scss';

import { addToCartAC } from '../../store/actions/mainActions';

export default function Bouquet() {
  const { id } = useParams();
  const product = useProductList(id);
  const dispatch = useDispatch();

  const [selectedBerries, setSelectedBerries] = useState('none');
  const [selectedTopper, setSelectedTopper] = useState('none');
  const [size] = useState('large');

  const handleBerriesChange = (value) => {
    setSelectedBerries(value);
  };
  const handleTopperChange = (value) => {
    setSelectedTopper(value);
  };
  const handleAddToCart = () => {
    const orderItem = {
      id: product.sku,
      berries: selectedBerries,
      topper: selectedTopper,
    };
    dispatch(addToCartAC(orderItem));
  };

  return (
    <div className={styles.container}>
      <Row>
        <Col span={11}>
          <Carousel autoplay>
            {product.photos.map((photo) => (
              <div key={product.name_title}>
                <img
                  src={`${photo}`}
                  alt="bouquet"
                  className={styles.carouselImage}
                />
              </div>
            ))}
          </Carousel>
        </Col>
        <Col span={1} />
        <Col span={12}>
          <div className={styles.bouquet_card_text}>
            <Space direction="vertical" align="start">
              <div className="bouquet_header">
                <h2>{product.name_title}</h2>
                <p>
                  Артикул:
                  {' '}
                  {product.sku}
                </p>
              </div>
              <div className="add_berries">
                <p>Украсить ягодами</p>
                <Select
                  defaultValue="Без ягод"
                  style={{ width: 220 }}
                  onChange={handleBerriesChange}
                  value={selectedBerries}
                  options={[
                    { value: 'none', label: 'Без ягод' },
                    { value: 'blueberry', label: 'Голубика 200€' },
                    { value: 'raspberry', label: 'Малина 250€' },
                    { value: 'mix', label: 'Голубика + малина 400€' },
                  ]}
                />
              </div>
              <div className="add_topper">
                <p>Добавить топпер в букет</p>
                <Select
                  defaultValue="Без топпера"
                  style={{ width: 400 }}
                  onChange={handleTopperChange}
                  value={selectedTopper}
                  options={[
                    { value: 'none', label: 'Без топпера' },
                    { value: 'happy bd', label: 'Топпер "С Днем Рождения" в ассортименте 149€' },
                    { value: 'love you', label: 'Топпер "Люблю" в ассортименте 149€' },
                    { value: '8march', label: 'Топпер "С 8 Марта" в ассортименте 149€' },
                    { value: 'for mom', label: 'Топпер "Маме" в ассортименте 149€' },
                  ]}
                />
              </div>
              <div className="button">
                <Button
                  type="primary"
                  size={size}
                  onClick={handleAddToCart}
                >
                  В КОРЗИНУ
                </Button>
              </div>
              <div className="description">
                <h4>{product.description.title}</h4>
                <p>
                  Состав:
                  {' '}
                  {product.description.ingredients}
                </p>
                <p>
                  Размер:
                  {' '}
                  {product.description.gift_size}
                </p>
                <p>
                  <SmileTwoTone twoToneColor="#52c41a" />
                  {' '}
                  Натуральный продукт! Срок хранения 24 часа при температуре от +4 до +8 градусов
                </p>
                <p>
                  <HeartTwoTone twoToneColor="#eb2f96" />
                  {' '}
                  Безопасно! Букет бережно упакован в прозрачную пленку для защиты от внешних факторов.
                </p>
                <h4>Описание товара:</h4>
                <p>
                  ягоды -
                  {' '}
                  {product.description.product_details.berries}
                  ,
                </p>
                <p>
                  шоколад -
                  {' '}
                  {product.description.product_details.chocolate}
                </p>
                <p>
                  топпинг -
                  {' '}
                  {product.description.product_details.topping}
                </p>
                <p>Обращаем Ваше внимание, что при наличии в поставке ягод меньшего калибра количество ягод в букетах и наборах будет увеличено для соблюдения итогового веса и размера композиции.</p>
              </div>
            </Space>
          </div>
        </Col>
      </Row>
    </div>
  );
}
