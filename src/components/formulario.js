import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {fileValidator} from "./validators";

const Formulario = () => {
    const regexOnlyNumbers = /^[0-9]+$/;
    const regexOnlyLetters = /^[a-zA-Z\s]*$/g;
    const regexEmail = /^[\w.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm();

    const [filename, setFileName] = useState("No se ha seleccionado ningún archivo.");

    function handleChange(event) {
        if(event.target.files.length !== 0) {
            setFileName(event.target.files[0].name);
        } else {
            setFileName("No se ha seleccionado ningún archivo.");
        }
    }

    const onSubmit = (data) => {
        const archivoPesado = fileValidator(data.archivo);
        if (archivoPesado) {
            return alert("El archivo pesa más de 10MB");
        } else {
            console.log("Se envían los datos:", data);
        }
    }

    return <div className={"base-landing"}>
        <div className={"base-formulario"}>
            <div className={"base-cabecera"}>
                <div className={"cabecera"}>Si ya realizaste tu compra, <span>regístrate aquí.</span></div>
                <div className={"subcabecera"}>Todos los campos con (*) son obligatorios</div>
            </div>
            <div className="base-cuerpo">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-inputs">
                        <div>
                            <div className="label-input">Nro de Comprobante de Pago (*)</div>
                            <input className="box-input" {...register('nroPago',
                                {
                                    required: true,
                                })}/>
                            {errors.nroPago?.type === 'required' && <div className={"txt-error"}>El número de boleta es obligatorio</div>}
                        </div>

                        <div>
                            <div className="label-input">Nombres (*)</div>
                            <input className="box-input" {...register('nombres',
                                {
                                    required: true,
                                    pattern: regexOnlyLetters
                                })}/>
                            {errors.nombres?.type === 'required' && <div className={"txt-error"}>El nombre es obligatorio</div>}
                            {errors.nombres?.type === 'pattern' && <div className={"txt-error"}>El nombre es inválido</div>}
                        </div>

                        <div>
                            <div className="label-input">Apellidos (*)</div>
                            <input className="box-input" {...register('apellidos',
                                {
                                    required: true,
                                    pattern: regexOnlyLetters
                                })}/>
                            {errors.apellidos?.type === 'required' && <div className={"txt-error"}>El apellido es obligatorio</div>}
                            {errors.apellidos?.type === 'pattern' && <div className={"txt-error"}>El apellido es inválido</div>}
                        </div>

                        <div>
                            <div className="label-input">DNI / Carnet de extranjería (*)</div>
                            <input className="box-input" {...register('numDoc',
                                {
                                    required: true,
                                    minLength: 8,
                                    maxLength: 12
                                })}/>
                            {errors.numDoc?.type === 'required' &&
                                <div className={"txt-error"}>El nro. de documento es obligatorio</div>}
                            {(errors.numDoc?.type === 'minLength' || errors.numDoc?.type === 'maxLength') &&
                                <div className={"txt-error"}>El nro. de documento debe tener entre 8 y 12 caracteres</div>}
                        </div>

                        <div>
                            <div className="label-input">Correo electrónico (*)</div>
                            <input className="box-input" {...register('correo',
                                {
                                    required: true,
                                    pattern: regexEmail
                                })}/>
                            {errors.correo?.type === 'required' && <div className={"txt-error"}>El correo electrónico es obligatorio</div>}
                            {errors.correo?.type === 'pattern' && <div className={"txt-error"}>El correo electrónico es inválido</div>}
                        </div>

                        <div>
                            <div className="label-input">Número de contacto (*)</div>
                            <input className="box-input" type="text"
                                   {...register('numContacto', {
                                       required: true,
                                       pattern: regexOnlyNumbers
                                   })}/>
                            {errors.numContacto?.type === 'required' && <div className={"txt-error"}>El nro. de teléfono es obligatorio</div>}
                            {errors.numContacto?.type === 'pattern' && <div className={"txt-error"}>El nro. de teléfono es inválido</div>}
                        </div>

                        <div>
                            <div className="label-input">Producto comprado (*)</div>
                            <select className="box-select"
                                    {...register('idProducto', {
                                        min: 1
                                    })}>
                                <option value="0">Selecciona</option>
                                <option value="1">Celular</option>
                                <option value="2">Audífonos</option>
                                <option value="3">Cargador</option>
                            </select>
                            {errors.idProducto?.type === 'min' && <div className={"txt-error"}>Escoja una opción</div>}
                        </div>

                        <div>
                            <div className="label-input">Tienda (*)</div>
                            <select className="box-select" {...register('idTienda', {
                                min: 1
                            })}>
                                <option value="0">Selecciona</option>
                                <option value="1">Tienda A</option>
                                <option value="2">Tienda B</option>
                                <option value="3">Tienda C</option>
                            </select>
                            {errors.idTienda?.type === 'min' && <div className={"txt-error"}>La tienda es obligatoria</div>}
                        </div>

                        <div>
                            <div className="label-input">Adjunta tu boleta de pago (*)</div>
                            <div className={"container-file"}>
                                <div className={"box-file"}>
                                    <label className={"btn-file"} htmlFor="filePicker">Examinar...</label>
                                    <label className={"input-file"} htmlFor="filePicker">{filename}</label>
                                    <input id="filePicker" type={"file"}
                                           onChangeCapture={handleChange}
                                           accept={".jpg, .png, .bmp, .tif, .pdf"}
                                           {...register('archivo', {
                                               required: true
                                           })}
                                           style={{display:"none"}}/>
                                </div>
                            </div>

                            <div className={"txt-warning"}>*Solo se podrá adjuntar un archivo con peso menor a 10MB en los formatos JPG, PNG, BMP, TIF, PDF.</div>
                            {errors.archivo?.type === 'required' && <div className={"txt-error"}>Debe seleccionar un archivo</div>}
                        </div>

                        <div className={"pivot-div"}></div>

                        <div className={"box-checkbox"}>
                            <input id={"chkPolPriv"} type={"checkbox"}
                                   {...register('politicaPriv', {
                                       required: true
                                   })}/>
                            <label className={"txt-checkbox"} htmlFor={"chkPolPriv"}>Acepto la POLÍTICA DE PRIVACIDAD (*)</label>
                        </div>

                        <div className={"box-checkbox"}>
                            <input id={"chkTermCond"}  type={"checkbox"}
                                   {...register('termCondic', {
                                       required: true
                                   })}/>
                            <label className={"txt-checkbox"} htmlFor={"chkTermCond"}>Acepto los Términos y condiciones (*)</label>
                        </div>

                        <div className={"box-checkbox"}>
                            <div>
                                <input id={"chkPromo"} type={"checkbox"} {...register('recibirPromo', {required: false})}/>
                            </div>
                            <label className={"txt-checkbox"} htmlFor={"chkPromo"}>Deseo recibir información de promociones Samsung</label>
                        </div>

                    </div>

                    {(errors.politicaPriv?.type === 'required' || errors.termCondic?.type === 'required') && <div className={"txt-error-checkbox"}>Debe marcar las casillas obligatorias (*)</div>}

                    <div className={"box-infotext"}>
                        <span className={"txt-infotext"}>Este sitio está protegido por reCAPTCHA.&nbsp;</span>
                        <span>Aplican la Política de Privacidad de Google y los Términos del Servicio</span>
                    </div>

                    <div className={"box-registrar"}>
                        <input className={"btn-registrar"} type={"submit"} value={"REGISTRAR"}/>
                    </div>

                </form>
            </div>
        </div>
    </div>

}


export default Formulario;