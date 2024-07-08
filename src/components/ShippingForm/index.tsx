import { Country, Harbor } from '@/lib/type';
import api, { API_URL } from '@/services/api';
import { Form, Select } from 'antd';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { FieldType, FormValue, SelectedFormValue } from './type.index';

const ShippingForm: React.FC = () => {
  const [formValue, setFormValue] = useState<FormValue>({
    negara: [],
    pelabuhan: [],
    barang:[]
  });
  const [selectedFormValue, setSelectedFormValue] = useState<SelectedFormValue>(
    {
      negara: '',
      pelabuhan: '',
      barang: '',
    }
  );

  useEffect(() => {
    getCountry();
  }, []);

  useEffect(() => {
    if (selectedFormValue.negara !== '') getHarbor(selectedFormValue.negara);
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

  const getHarbor = async (countryId: string | number) => {
    try {
      const resHarbor = await api.get(
        `${API_URL.pelabuhan}?filter={"where":{"id_negara":${countryId}}}`
      );

      const dataHarbor = resHarbor.data.map((harbor: Harbor) => ({
        value: harbor.id_pelabuhan,
        label: harbor.nama_pelabuhan,
      }));
      setFormValue((state) => ({
        ...state,
        pelabuhan: dataHarbor,
      }));
    } catch (error: AxiosError | unknown) {
      console.error(error);
    }
  };
  /* End Get Fetching */

  const onSelectedForm = (key: keyof SelectedFormValue, value: string) => {
    setSelectedFormValue((state) => ({ ...state, [key]: `${value}` }));
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
          onChange={(val) => onSelectedForm('negara', val)}
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
          onChange={(val) => onSelectedForm('pelabuhan', val)}
          options={formValue.pelabuhan}
          disabled={selectedFormValue.negara === ''}
        />
      </Form.Item>

      <Form.Item<FieldType>
        label="Barang"
        name="barang"
        rules={[{ required: true }]}
      >
        <Select
          showSearch
          placeholder="Select a Harbor"
          optionFilterProp="label"
          onChange={(val) => onSelectedForm('pelabuhan', val)}
          options={formValue.barang}
          disabled={selectedFormValue.pelabuhan === ''}
        />
      </Form.Item>
    </Form>
  );
};

export default ShippingForm;
