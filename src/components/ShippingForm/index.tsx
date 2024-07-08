import { Country, Harbor, Product } from '@/lib/type';
import api, { API_URL } from '@/services/api';
import { Form, Input, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { FieldType, FormValue, SelectedFormValue } from './type.index';
import { formatCurrency, getTotalPriceWithDiscrount } from '@/utils/helpers';

const { TextArea } = Input;

const initialFormValue = {
  formData: {
    negara: [],
    pelabuhan: [],
    barang: [],
  },
  originalData: {
    negara: [],
    pelabuhan: [],
    barang: [],
  },
};

const ShippingForm: React.FC = () => {
  const [form] = useForm();
  const [formValue, setFormValue] = useState<FormValue>(initialFormValue);
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

  /* Get Fetching */
  const getCountry = async () => {
    try {
      const resNegara = await api.get(API_URL.NEGARA);
      const dataNegara = resNegara.data;
      const sortedNegara = dataNegara.map((country: Country) => ({
        value: country.id_negara,
        label: `${country.kode_negara} - ${country.nama_negara}`,
      }));
      setFormValue((state) => ({
        ...state,
        originalData: {
          ...state.originalData,
          negara: dataNegara,
        },
        formData: {
          ...state.formData,
          negara: sortedNegara,
        },
      }));
    } catch (error: AxiosError | unknown) {
      console.error(error);
    }
  };

  const getHarbor = async (countryId: string | number) => {
    try {
      const resHarbor = await api.get(
        `${API_URL.PELABUHAN}?filter={"where":{"id_negara":${countryId}}}`
      );

      const dataHarbor = resHarbor.data;
      const sortedHarbor = dataHarbor.map((harbor: Harbor) => ({
        value: harbor.id_pelabuhan,
        label: harbor.nama_pelabuhan,
      }));

      setFormValue((state) => ({
        ...state,
        originalData: {
          ...state.originalData,
          pelabuhan: dataHarbor,
        },
        formData: {
          ...state.formData,
          pelabuhan: sortedHarbor,
        },
      }));
    } catch (error: AxiosError | unknown) {
      console.error(error);
    }
  };
  const getProduct = async (harborId: string | number) => {
    try {
      const resProduct = await api.get(
        `${API_URL.BARANG}?filter={"where":{"id_pelabuhan":${harborId}}}`
      );
      const dataProduct = resProduct.data;
      const sortedProduct = dataProduct.map((product: Product) => ({
        value: product.id_barang,
        label: `${product.id_barang} - ${product.nama_barang}`,
      }));

      setFormValue((state) => ({
        ...state,
        originalData: {
          ...state.originalData,
          barang: dataProduct,
        },
        formData: {
          ...state.formData,
          barang: sortedProduct,
        },
      }));
    } catch (error: AxiosError | unknown) {
      console.error(error);
    }
  };
  /* End Get Fetching */

  const onSelectedForm = (key: keyof SelectedFormValue, value: string) => {
    setSelectedFormValue((state) => ({ ...state, [key]: `${value}` }));

    if (key === 'barang') {
      const selectedProduct = formValue.originalData.barang.find(
        (item) => `${item.id_barang}` === `${value}`
      );

      /* s */
      form.setFieldsValue({
        barangDetail: `id barang: ${selectedProduct?.id_barang}
  nama barang : ${selectedProduct?.nama_barang}
  description : ${selectedProduct?.description}
  diskon : ${selectedProduct?.diskon}%
  harga : ${formatCurrency(Number(selectedProduct?.harga) || 0)}`,
        discount: `${selectedProduct?.diskon}%`,
        harga: `Rp.${formatCurrency(Number(selectedProduct?.harga) || 0)}`,
        total: `Rp.${getTotalPriceWithDiscrount(
          Number(selectedProduct?.harga || 0),
          Number(selectedProduct?.diskon || 0)
        )}`,
      });
    }
  };

  return (
    <Form
      form={form}
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
          options={formValue.formData.negara}
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
          options={formValue.formData.pelabuhan}
          // disabled={selectedFormValue.negara === ''}
          onFocus={() => getHarbor(selectedFormValue.negara)}
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
          onChange={(val) => onSelectedForm('barang', val)}
          options={formValue.formData.barang}
          // disabled={selectedFormValue.pelabuhan === ''}
          onFocus={() => getProduct(selectedFormValue.pelabuhan)}
        />
      </Form.Item>
      <Form.Item<FieldType>
        label="Informasi Barang"
        name="barangDetail"
        rules={[{ required: true }]}
      >
        <TextArea rows={5} placeholder="Product Information" readOnly />
      </Form.Item>

      <Form.Item<FieldType>
        label="harga"
        name="discount"
        rules={[{ required: true }]}
      >
        <Input readOnly />
      </Form.Item>
      <Form.Item<FieldType>
        label="Harga"
        name="harga"
        rules={[{ required: true }]}
      >
        <Input readOnly />
      </Form.Item>
      <Form.Item<FieldType>
        label="Total"
        name="total"
        rules={[{ required: true }]}
      >
        <Input readOnly />
      </Form.Item>
    </Form>
  );
};

export default ShippingForm;
