import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  phone: yup.string().matches(/^[0-9]{7,}$/, "Phone number must be at least 7 digits").required("Phone number is required"),
  dob: yup.date().required("Date of Birth is required"),
  city: yup.string().required("City is required"),
  district: yup.string().required("District is required"),
  province: yup.string().required("Province is required"),
  profilePicture: yup.mixed().test("fileType", "Only png files are allowed", (value) => {
    return value && value[0] && value[0].type === "image/png";
  }),
});

const EditItem = ({ item, updateItem, cancelEdit }) => {
  const [countries, setCountries] = useState([]);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      setCountries(response.data);
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    reset(item);
  }, [item, reset]);

  const onSubmit = (data) => {
    updateItem(item.id, data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Name" {...register('name')} defaultValue={item.name} />
      <p>{errors.name?.message}</p>
      <input type="email" placeholder="Email" {...register('email')} defaultValue={item.email} />
      <p>{errors.email?.message}</p>
      <input type="text" placeholder="Phone Number" {...register('phone')} defaultValue={item.phone} />
      <p>{errors.phone?.message}</p>
      <input type="date" placeholder="DOB" {...register('dob')} defaultValue={item.dob} />
      <p>{errors.dob?.message}</p>
      <input type="text" placeholder="City" {...register('city')} defaultValue={item.city} />
      <p>{errors.city?.message}</p>
      <input type="text" placeholder="District" {...register('district')} defaultValue={item.district} />
      <p>{errors.district?.message}</p>
      <select {...register('province')} defaultValue={item.province}>
        <option value="">Select Province</option>
        <option value="Province 1">Province 1</option>
        <option value="Province 2">Province 2</option>
        <option value="Province 3">Province 3</option>
        <option value="Province 4">Province 4</option>
        <option value="Province 5">Province 5</option>
        <option value="Province 6">Province 6</option>
        <option value="Province 7">Province 7</option>
      </select>
      <p>{errors.province?.message}</p>
      <select {...register('country')} defaultValue={item.country}>
        {countries.map((country) => (
          <option key={country.cca3} value={country.name.common}>{country.name.common}</option>
        ))}
      </select>
      <input type="file" {...register('profilePicture')} />
      <p>{errors.profilePicture?.message}</p>
      <button type="submit">Update</button>
      <button type="button" onClick={cancelEdit}>Cancel</button>
    </form>
  );
};

export default EditItem;
