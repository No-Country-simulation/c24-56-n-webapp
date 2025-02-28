from rest_framework.views import exception_handler

def custom_exception_handler(exc, context):
    # Llama al manejador de excepciones por defecto para obtener la respuesta estándar
    response = exception_handler(exc, context)

    # Si la respuesta es 403, cámbiala a 401
    if response is not None and response.status_code == 403:
        response.status_code = 401

    return response