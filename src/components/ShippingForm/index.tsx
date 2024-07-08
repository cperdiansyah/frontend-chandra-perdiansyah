import { Country } from '@/lib/type';
import api, { API_URL } from '@/services/api';
import { Form, Select } from 'antd';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { FieldType, FormValue, SelectedFormValue } from './type.index';

const ShippingForm: React.FC = () => {
  const [formValue, setFormValue] = useState<FormValue>({
    negara: [],
    pelabuhan: [],
  });
  const [selectedFormValue, setSelectedFormValue] = useState<SelectedFormValue>(
    {
      negara: 0,
    }
  );

  useEffect(() => {
    getCountry();
  }, []);

  useEffect(() => {
    if (selectedFormValue.negara) getHarbor(selectedFormValue.negara);
  }, [selectedFormValue]);

  /* Get Fetching */
  const getCountry = async () => {
    try {
      const resNegara = await api.get(API_URL.negara);
      const dataNegara = resNegara.data.map((country: Country) => ({
        value: country.id_negara,
        label: `${country.kode_negara} - ${country.nama_negara}`,
      }));
      setFormValue((state) => ({
        ...state,
        negara: dataNegara,
      }));
    } catch (error: AxiosError | unknown) {
      console.error(error);
    }
  };

  const getHarbor = async (params: string | number) => {
    try {
      const resHarbor = await api.get(
        `${API_URL.pelabuhan}?filter={"where":{"id_negara":${selectedFormValue.negara}}}`
      );
      const dataHarbor = resHarbor.data;
      console.log(dataHarbor);
      /* const dataHarbor = resHarbor.data.map((country: Country) => ({
        value: country.id_negara,
        label: `${country.kode_negara} - ${country.nama_negara}`,
      })); */
      setFormValue((state) => ({
        ...state,
        pelabuhan: dataHarbor,
      }));
    } catch (error: AxiosError | unknown) {
      console.error(error);
    }
  };
  /* End Get Fetching */

  const onSelectedCountry = async (value: number) => {
    setSelectedFormValue((state) => ({ ...state, negara: value }));
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      layout="horizontal"
      title="Shipping Form"
    >
      <Form.Item<FieldType>
        label="Negara"
        name="negara"
        rules={[{ required: true }]}
      >
        <Select
          showSearch
          placeholder="Select a Country"
          optionFilterProp="label"
          onChange={onSelectedCountry}
          options={formValue.negara}
        />
      </Form.Item>

      <Form.Item<FieldType>
        label="Pelabuhan"
        name="pelabuhan"
        rules={[{ required: true }]}
      >
        <Select
          showSearch
          placeholder="Select a Harbor"
          optionFilterProp="label"
          onChange={onSelectedCountry}
          options={formValue.negara}
          disabled={selectedFormValue.negara === 0}
        />
      </Form.Item>

      {/* <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item> */}
    </Form>
  );
};

export default ShippingForm;
