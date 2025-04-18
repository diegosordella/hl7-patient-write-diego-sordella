document.getElementById('patientForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const name = document.getElementById('name').value;
    const familyName = document.getElementById('familyName').value;
    const gender = document.getElementById('gender').value;
    const birthDate = document.getElementById('birthDate').value;
    const identifierSystem = document.getElementById('identifierSystem').value;
    const identifierValue = document.getElementById('identifierValue').value;
    const cellPhone = document.getElementById('cellPhone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const postalCode = document.getElementById('postalCode').value;

    // Crear el objeto Patient en formato FHIR
    const patient = {
        resourceType: "Patient",
        name: [{
            use: "official",
            given: [name],
            family: familyName
        }],
        gender: gender,
        birthDate: birthDate,
        identifier: [{
            system: identifierSystem,
            value: identifierValue
        }],
        telecom: [{
            system: "phone",
            value: cellPhone,
            use: "home"
        }, {
            system: "email",
            value: email,
            use: "home"
        }],
        address: [{
            use: "home",
            line: [address],
            city: city,
            postalCode: postalCode,
            country: "Colombia"
        }]
    };

    // Enviar los datos usando Fetch API
    fetch('https://hl7-patient-write-diego-sordella-srv5.onrender.com/patient', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(patient)
    })
    .then(async response => {
        const text = await response.text();
        console.log("🧾 Respuesta cruda del servidor:", text);
    
        // Intentar parsear solo si hay contenido
        if (text) {
            const data = JSON.parse(text);
            console.log('✅ Success:', data);
            alert('Paciente creado exitosamente!');
        } else {
            throw new Error("El servidor no devolvió contenido.");
        }
    })
    .catch((error) => {
        console.error('❌ Error:', error);
        alert('Error al crear el paciente. ' + error.message);
    });
});
