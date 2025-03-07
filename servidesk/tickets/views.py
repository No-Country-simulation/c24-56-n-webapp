from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from .models import Ticket

# Asegura que el usuario esté autenticado
def crear_ticket(request):
    User = get_user_model()
    
    if request.method == 'POST':
        # Obtiene los datos del formulario
        descripcion = request.POST.get('descripcion', '')
        estado = request.POST.get('estado', 'PENDIENTE')
        # El cliente es el usuario actual
        cliente = request.user
        # El técnico puede ser seleccionado o dejado en blanco
        tecnico_id = request.POST.get('tecnico')
        tecnico = None
        if tecnico_id:
            try:
                tecnico = User.objects.get(id=tecnico_id)
            except User.DoesNotExist:
                pass
        
        # Validación básica
        if not descripcion:
            return HttpResponse("Error: La descripción es obligatoria", status=400)
        
        try:
            # Crea el ticket
            nuevo_ticket = Ticket(
                descripcion=descripcion,
                estado=estado,
                cliente=cliente,
                tecnico=tecnico
                # fecha_creacion y fecha_actualizacion se manejan automáticamente
            )
            nuevo_ticket.save()
            return HttpResponse(f"Ticket creado con éxito! Número: {nuevo_ticket.n_ticket}")
        except Exception as e:
            return HttpResponse(f"Error al crear el ticket: {str(e)}", status=400)
    
    # Si es GET, muestra un formulario HTML básico
    # Obtiene todos los usuarios que podrían ser técnicos
    tecnicos = User.objects.all()
    
    html_form = """
    <html>
    <head>
        <title>Crear Ticket</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; text-align: center; }
            form { max-width: 600px; margin: 0 auto; }
            label { display: block; margin-top: 10px; font-weight: bold; }
            input, textarea, select { width: 100%; padding: 8px; margin-top: 5px; box-sizing: border-box; }
            textarea { min-height: 150px; }
            button { background-color: #4CAF50; color: white; padding: 10px 15px; 
                    border: none; cursor: pointer; margin-top: 15px; }
            .info { background-color: #f8f9fa; padding: 10px; border-radius: 4px; margin-top: 20px; }
        </style>
    </head>
    <body>
        <h1>Crear Nuevo Ticket</h1>
        <form method="post">
            <input type="hidden" name="csrfmiddlewaretoken" value="{csrf}">
            
            <label for="descripcion">Descripción del problema:</label>
            <textarea id="descripcion" name="descripcion" required placeholder="Describa detalladamente el problema..."></textarea>
            
            <label for="estado">Estado:</label>
            <select id="estado" name="estado">
                <option value="PENDIENTE">Pendiente</option>
                <option value="EN_PROGRESO">En progreso</option>
                <option value="RESUELTO">Resuelto</option>
            </select>
            
            <label for="tecnico">Asignar técnico (opcional):</label>
            <select id="tecnico" name="tecnico">
                <option value="">-- Sin asignar --</option>
                {opciones_tecnicos}
            </select>
            
            <div class="info">
                <p>Cliente: {nombre_cliente}</p>
                <p>Fecha: Automática al crear</p>
            </div>
            
            <button type="submit">Crear Ticket</button>
        </form>
    </body>
    </html>
    """    
    # Genera las opciones para los técnicos
    opciones_tecnicos = ""
    for tecnico in tecnicos:
        opciones_tecnicos += f'<option value="{tecnico.id}">{tecnico.username}</option>'
    
    # Reemplaza los marcadores de posición
    from django.middleware.csrf import get_token
    csrf_token = get_token(request)
    html_form = html_form.replace('{csrf}', csrf_token)
    html_form = html_form.replace('{opciones_tecnicos}', opciones_tecnicos)
    html_form = html_form.replace('{nombre_cliente}', request.user.username)
    
    return HttpResponse(html_form)