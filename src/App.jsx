import React from 'react';

import { useForm } from 'react-hook-form';

const App = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
	} = useForm();
	console.log(errors);
	const onSubmit = handleSubmit((data) => {
		console.log(data);
		console.log('enviando');
		reset();
	});
	return (
		<form onSubmit={onSubmit}>
			<label>Nombre</label>
			<input
				type="text"
				{...register('name', {
					required: {
						value: true,
						message: 'Escribe tu nombre',
					},
					minLength: {
						value: 3,
						message: 'Tu nombre debe de tener minimo 3 caracteres',
					},
					maxLength: {
						value: 20,
						message: 'Tu nombre debe de tener maximo 20 caracteres',
					},
				})}
			/>
			{errors.name?.type === 'required' && (
				<label className="error">{errors.name?.message}</label>
			)}

			<label>Correo</label>
			<input
				type="email"
				{...register('email', {
					required: {
						value: true,
						message: 'Escribe tu correo',
					},
				})}
			/>
			{errors.email?.type === 'required' && (
				<label className="error">{errors.email?.message}</label>
			)}
			<label>contraseña</label>
			<input
				type="password"
				{...register('password', {
					required: {
						value: true,
						message: 'Escribe tu contraseña',
					},
				})}
			/>
			{errors.password?.type === 'required' && (
				<label className="error">{errors.password?.message}</label>
			)}
			<label>Confirmar contraseña</label>
			<input
				type="password"
				{...register('confirmPassword', {
					required: {
						value: true,
						message: 'Confirmar contraseña es requerido',
					},
					validate: (value) => {
						if (value === watch('password')) {
							return true;
						} else {
							return 'Verifica bien la contraseña';
						}
					},
				})}
			/>
			{errors?.confirmPassword && (
				<label className="error">{errors.confirmPassword?.message}</label>
			)}
			<label>Fecha de nacimiento</label>
			<input
				type="date"
				{...register('birthday', {
					required: {
						value: true,
						message: 'Elige tu dia de nacimiento',
					},
					validate: (value) => {
						const dateBirthdate = new Date(value);
						const dateCurrent = new Date();
						const age = dateCurrent.getFullYear() - dateBirthdate.getFullYear();
						const validateAge = age >= 18 ? true : 'Tienes que tener +18 años';
						return validateAge;
					},
				})}
			/>
			{errors?.birthday && (
				<label className="error">{errors.birthday?.message}</label>
			)}
			<label>De donde eres</label>
			<select
				{...register('country', {
					required: {
						value: true,
						message: 'Escribe tu nombre',
					},
					validate: (value) => {
						if (value == 'x') return 'Elige tu pais';
						return true;
					},
				})}>
				<option value="x">Elige</option>
				<option value="co">Colombia</option>
				<option value="abi">Ecuador</option>
				<option value="arg">Argentina</option>
			</select>
			{errors?.country && (
				<label className="error">{errors.country?.message}</label>
			)}
			<div>
				<input
					type="checkbox"
					{...register('check', {
						required: {
							value: true,
							message: 'Acepta los terminos',
						},
					})}
				/>
				<span>Quieres aceptar terminos?</span>
				{errors.check?.type === 'required' && (
					<label className="error">{errors.check?.message}</label>
				)}
			</div>
			<button type="submit">Enviar</button>
		</form>
	);
};

export default App;
