const contactForm = document.querySelector('#contactForm');
const nombreInput = document.querySelector('#nombre');
const emailInput = document.querySelector('#email');
const edadInput = document.querySelector('#edad');
const comentariosTextarea = document.querySelector('#comentarios');
const submitButton = document.querySelector('.form-btn');

const errorNombre = document.querySelector('#errorNombre');
const errorEmail = document.querySelector('#errorEmail');
const errorEdad = document.querySelector('#errorEdad');
const errorComentarios = document.querySelector('#errorComentarios');
const mensajeConfirmacionDiv = document.querySelector('#mensajeConfirmacion');

function mostrarError(elementoError, mensaje) {
    elementoError.textContent = mensaje;
    elementoError.style.display = 'block';
    elementoError.closest('.form-group').querySelector('input, textarea, select')?.classList.add('input-error');
}

function limpiarError(elementoError) {
    elementoError.textContent = '';
    elementoError.style.display = 'none';
    elementoError.closest('.form-group').querySelector('input, textarea, select')?.classList.remove('input-error');
}

function limpiarMensajeGeneral() {
    mensajeConfirmacionDiv.textContent = '';
    mensajeConfirmacionDiv.style.display = 'none';
    mensajeConfirmacionDiv.style.backgroundColor = 'transparent';
    mensajeConfirmacionDiv.style.color = '#333';
    mensajeConfirmacionDiv.style.border = 'none';
}

function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validarFormulario() {
    let isValid = true;
    limpiarMensajeGeneral();

    limpiarError(errorNombre);
    limpiarError(errorEmail);
    limpiarError(errorEdad);
    limpiarError(errorComentarios);

    if (nombreInput.value.trim() === '') {
        mostrarError(errorNombre, 'El nombre es obligatorio.');
        isValid = false;
    }

    if (emailInput.value.trim() === '') {
        mostrarError(errorEmail, 'El correo electrónico es obligatorio.');
        isValid = false;
    } else if (!validarEmail(emailInput.value.trim())) {
        mostrarError(errorEmail, 'Formato de correo electrónico no válido.');
        isValid = false;
    }

    const edad = parseInt(edadInput.value.trim());
    if (isNaN(edad) || edadInput.value.trim() === '') {
        mostrarError(errorEdad, 'La edad es obligatoria.');
        isValid = false;
    } else if (edad < 18) {
        mostrarError(errorEdad, 'Debes ser mayor de 17 años.');
        isValid = false;
    }

    if (comentariosTextarea.value.trim() === '') {
        mostrarError(errorComentarios, 'Los comentarios no pueden estar vacíos.');
        isValid = false;
    }

    return isValid;
}

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    if (validarFormulario()) {
        const nombreUsuario = nombreInput.value;
        const mensajeCreado = document.createElement('p');
        mensajeCreado.textContent = `¡Gracias por tu mensaje, ${nombreUsuario}! Te contactaré pronto.`;
        
        mensajeConfirmacionDiv.innerHTML = ''; 
        mensajeConfirmacionDiv.appendChild(mensajeCreado);
        mensajeConfirmacionDiv.style.display = 'block';
        mensajeConfirmacionDiv.style.backgroundColor = '#d4edda';
        mensajeConfirmacionDiv.style.color = '#155724';
        mensajeConfirmacionDiv.style.border = '1px solid #c3e6cb';

        contactForm.reset();
        
    } else {
        mensajeConfirmacionDiv.textContent = 'Por favor, corrige los errores en el formulario.';
        mensajeConfirmacionDiv.style.display = 'block';
        mensajeConfirmacionDiv.style.backgroundColor = '#f8d7da';
        mensajeConfirmacionDiv.style.color = '#721c24';
        mensajeConfirmacionDiv.style.border = '1px solid #f5c6cb';
    }
});

nombreInput.addEventListener('blur', () => {
    if (nombreInput.value.trim() === '') {
        mostrarError(errorNombre, 'El nombre es obligatorio.');
    } else {
        limpiarError(errorNombre);
    }
});

emailInput.addEventListener('blur', () => {
    if (emailInput.value.trim() === '') {
        limpiarError(errorEmail);
    } else if (!validarEmail(emailInput.value.trim())) {
        mostrarError(errorEmail, 'Formato de correo electrónico no válido.');
    } else {
        limpiarError(errorEmail);
    }
});

edadInput.addEventListener('blur', () => {
    const edad = parseInt(edadInput.value.trim());
    if (isNaN(edad) || edadInput.value.trim() === '') {
        limpiarError(errorEdad);
    } else if (edad < 18) {
        mostrarError(errorEdad, 'Debes ser mayor de 17 años.');
    } else {
        limpiarError(errorEdad);
    }
});

nombreInput.addEventListener('input', () => limpiarError(errorNombre));
emailInput.addEventListener('input', () => limpiarError(errorEmail));
edadInput.addEventListener('input', () => limpiarError(errorEdad));
comentariosTextarea.addEventListener('input', () => limpiarError(errorComentarios));

contactForm.addEventListener('input', limpiarMensajeGeneral);
contactForm.addEventListener('click', (event) => {
    if (event.target !== submitButton) {
        limpiarMensajeGeneral();
    }
});