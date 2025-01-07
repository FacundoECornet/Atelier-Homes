const form = document.getElementById('contact-form');

    form.addEventListener('submit', async function(event) {
      event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

      const formData = new FormData(form);

      try {
        // Realiza la solicitud POST a Formspree
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: {
            Accept: 'application/json',
          },
        });

        if (response.ok) {
          // Mostrar alerta de éxito
          alert('¡Correo enviado con éxito! Nos pondremos en contacto contigo pronto.');
          form.reset(); // Reinicia el formulario
        } else {
          // Mostrar alerta de error si falla la solicitud
          alert('Hubo un problema al enviar el correo. Por favor, inténtalo de nuevo más tarde.');
        }
      } catch (error) {
        // Manejo de errores de red o conexión
        alert('Error al enviar el correo. Por favor, verifica tu conexión e inténtalo nuevamente.');
        console.error('Error:', error);
      }
    });