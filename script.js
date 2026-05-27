const sections=[...document.querySelectorAll('.section')];
const navLinks=[...document.querySelectorAll('.nav a')];
const lessonIds=['inicio','guia-vscode','zona-0','curso-desde-cero','arquitectura','zona-3','zona-4','epica1','zona-6','epica6','flujo','retos','fuentes','zona-7','zona-8','zona-9','zona-11','zona-13','zona-14','zona-15'];
const stored=JSON.parse(localStorage.getItem('ctStudyDone')||'{}');

function updateProgress(){
  let count=lessonIds.filter(id=>stored[id]).length;
  const total=12; // main learning milestones
  const countForBar=['inicio','guia-vscode','zona-0','curso-desde-cero','arquitectura','zona-3','zona-4','epica1','zona-6','epica6','flujo','retos'].filter(id=>stored[id]).length;
  document.getElementById('barFill').style.width=(countForBar/total*100)+'%';
  document.getElementById('progressText').textContent=`${countForBar} / ${total} lecciones completadas`;
  Object.keys(stored).forEach(id=>{ const el=document.getElementById('done-'+id); if(el) el.textContent='✔ completada'; });
}

function show(hash){
  const id=(hash||location.hash||'#inicio').replace('#','');
  sections.forEach(s=>s.classList.toggle('active',s.id===id));
  navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+id));
}

function completeLesson(id){
  stored[id]=true; localStorage.setItem('ctStudyDone',JSON.stringify(stored)); updateProgress();
}

function normalize(v){ return (v||'').toString().trim().toLowerCase(); }

const quizFeedback = {
  'quiz-arq-1': {
    section: 'Arquitectura y enrutamiento',
    subapartado: 'Código real',
    fragmento: 'path(\'usuarios/\', include(\'apps.usuarios.urls\'))',
    explicacion: 'La app usuarios gestiona login, registro, paneles, perfiles y recuperación de contraseñas. Su ruta es /usuarios/.',
    pista: 'Mira el listado de rutas en el bloque de código, busca la línea que incluye "apps.usuarios.urls".',
    codigo: 'urlpatterns = [\n    path(\'admin/\', admin.site.urls),\n    path(\'licensing/\', include(\'apps.licensing.urls\')),\n    path(\'usuarios/\', include(\'apps.usuarios.urls\')),\n    path(\'clientes/\', include(\'apps.clientes.urls\')),\n    ...\n]'
  },
  'res-arq-2': {
    section: 'Arquitectura y enrutamiento',
    subapartado: 'Paso 4: 2 palabras clave',
    fragmento: 'include() — "Ve a buscar más direcciones en otra carpeta"',
    explicacion: 'La función include() se usa para incluir las rutas de otra app. Permite organizar las rutas por módulos.',
    pista: 'Mira la explicación de la función include() en el Paso 4.',
    codigo: 'path(\'usuarios/\', include(\'apps.usuarios.urls\'))'
  },
  'e1q1': {
    section: 'Épica 1 · Modelos base',
    subapartado: 'Código real',
    fragmento: 'class Usuario(models.Model): ... rol = models.CharField(max_length=50, choices=ROLES)',
    explicacion: 'El rol se almacena en el modelo Usuario, que extiende el User nativo de Django con campos adicionales.',
    pista: 'Revisa el modelo Usuario en el código, busca el campo "rol".',
    codigo: 'class Usuario(models.Model):\n    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="usuario")\n    nombres = models.CharField(max_length=200)\n    apellidos = models.CharField(max_length=200)\n    telefono = models.CharField(max_length=20, blank=True)\n    documento = models.CharField(max_length=20)\n    rol = models.CharField(max_length=50, choices=ROLES)'
  },
  'quiz-e1-2': {
    section: 'Épica 1 · Formularios',
    subapartado: 'Código real',
    fragmento: 'def clean(self): ...',
    explicacion: 'El método clean() se usa para validar campos que dependen entre sí, como que las contraseñas coincidan.',
    pista: 'Mira el código del formulario, busca el método que compara "contrasena" y "confirmar_contrasena".',
    codigo: 'def clean(self):\n    cleaned_data = super().clean()\n    password = cleaned_data.get("contrasena")\n    confirm_password = cleaned_data.get("confirmar_contrasena")\n    if password and confirm_password and password != confirm_password:\n        self.add_error(\'confirmar_contrasena\', "Las contraseñas no coinciden.")'
  },
  'e1q3': {
    section: 'Épica 1 · Registro, login y paneles',
    subapartado: 'Código real',
    fragmento: 'return redirect("usuarios:login")',
    explicacion: 'Después de crear el usuario y el perfil, la vista redirige al login para que el usuario inicie sesión.',
    pista: 'Busca la línea con "return redirect" en la función de registro.',
    codigo: 'def registro(request):\n    if request.method == "POST":\n        form = RegistroForm(request.POST)\n        if form.is_valid():\n            user = User.objects.create_user(username=email, email=email, password=password)\n            perfil = form.save(commit=False)\n            perfil.user = user\n            perfil.rol = "cliente"\n            perfil.save()\n            return redirect("usuarios:login")'
  },
  'quiz-e1-4': {
    section: 'Épica 1 · Cliente y pedidos',
    subapartado: 'Código real',
    fragmento: '@receiver(post_save, sender=\'usuarios.Usuario\')',
    explicacion: 'La señal post_save se ejecuta automáticamente después de guardar un objeto, y aquí se usa para crear el perfil cliente.',
    pista: 'Mira el decorador @receiver, busca la señal que se usa.',
    codigo: '@receiver(post_save, sender=\'usuarios.Usuario\')\ndef crear_perfil_cliente(sender, instance, created, **kwargs):\n    if created and instance.rol == \'cliente\':\n        Cliente.objects.get_or_create(usuario=instance)'
  },
  'e6q1': {
    section: 'Épica 6 · De pedido a factura',
    subapartado: 'Código real',
    fragmento: 'pedido = models.OneToOneField(\'ordenes.Pedido\', ...)',
    explicacion: 'Una factura se asocia de forma uno a uno con un pedido, usando un OneToOneField.',
    pista: 'Busca la relación entre Factura y Pedido en el código.',
    codigo: 'class Factura(models.Model):\n    pedido = models.OneToOneField(\'ordenes.Pedido\', on_delete=models.PROTECT,\n                                  related_name=\'factura\', null=True, blank=True)'
  },
  'quiz-e6-2': {
    section: 'Épica 6 · Registrar pago',
    subapartado: 'Código real',
    fragmento: 'factura = Factura.objects.select_for_update().get(id=factura_id)',
    explicacion: 'select_for_update() bloquea la fila de la factura en la base de datos para evitar condiciones de carrera en pagos concurrentes.',
    pista: 'Mira la línea donde se obtiene la factura dentro de la transacción atómica.',
    codigo: 'with transaction.atomic():\n    factura = Factura.objects.select_for_update().get(id=factura_id)'
  },
  'e6q3': {
    section: 'Épica 6 · Pago, estado e historial',
    subapartado: 'Código real',
    fragmento: 'def saldo_pendiente(self): return self.total - self.total_pagado',
    explicacion: 'El saldo pendiente se calcula restando el total pagado al total de la factura.',
    pista: 'Busca la propiedad @property "saldo_pendiente" en el modelo Factura.',
    codigo: 'class Factura(models.Model):\n    @property\n    def total_pagado(self):\n        return sum(p.monto for p in self.pagos.all())\n\n    @property\n    def saldo_pendiente(self):\n        return self.total - self.total_pagado'
  },
  'final1': {
    section: 'Épica 6 · Registrar pago',
    subapartado: 'Código real',
    fragmento: 'def registrar_pago(request):',
    explicacion: 'La función que registra los pagos se llama registrar_pago.',
    pista: 'Busca el nombre de la vista en el código de facturación/pagos.',
    codigo: '@login_required\n@require_POST\ndef registrar_pago(request):'
  },
  'final2': {
    section: 'Épica 1 · Modelos base',
    subapartado: 'Código real',
    fragmento: 'class Usuario(models.Model):',
    explicacion: 'El modelo que extiende el usuario nativo de Django se llama Usuario.',
    pista: 'Busca el modelo que tiene un OneToOneField con User.',
    codigo: 'class Usuario(models.Model):\n    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="usuario")'
  },
  'final3': {
    section: 'Épica 6 · De pedido a factura',
    subapartado: 'Código real',
    fragmento: 'class Factura(models.Model):',
    explicacion: 'El modelo financiero principal es Factura.',
    pista: 'Busca el modelo que maneja subtotal, IVA, total y estado de pago.',
    codigo: 'class Factura(models.Model):\n    pedido = models.OneToOneField(\'ordenes.Pedido\', ...)\n    cliente = models.ForeignKey(\'usuarios.Usuario\', ...)\n    subtotal = models.DecimalField(...)\n    iva = models.DecimalField(...)\n    total = models.DecimalField(...)\n    estado = models.CharField(...)'
  }
};

function renderFeedback(quizId, ok) {
  const fb = quizFeedback[quizId];
  if (!fb) return ok ? 'Correcto.' : 'Todavía no. Revisa el código de la lección.';
  if (ok) {
    return `
      <div class="feedback-box" style="border-color:#3f6b3f">
        <div class="feedback-header ok">Resultado: Correcto</div>
        <div class="feedback-section">
          <span class="feedback-label">Dónde se confirma en la página:</span>
          <div>Sección: ${fb.section}</div>
          ${fb.subapartado ? `<div>Subapartado: ${fb.subapartado}</div>` : ''}
        </div>
        <div class="feedback-section">
          <span class="feedback-label">Por qué está bien:</span>
          <div>${fb.explicacion}</div>
        </div>
        <div class="feedback-section">
          <span class="feedback-label">Recuerda:</span>
          <div class="feedback-code">${fb.fragmento}</div>
        </div>
      </div>
    `;
  } else {
    return `
      <div class="feedback-box" style="border-color:#7a3b3b">
        <div class="feedback-header bad">Resultado: Incorrecto</div>
        <div class="feedback-section">
          <span class="feedback-label">Qué has fallado:</span>
          <div>Tu respuesta no coincide con la información de la página.</div>
        </div>
        <div class="feedback-section">
          <span class="feedback-label">Dónde se ve en la página:</span>
          <div>Sección: ${fb.section}</div>
          ${fb.subapartado ? `<div>Subapartado: ${fb.subapartado}</div>` : ''}
        </div>
        <div class="feedback-section">
          <span class="feedback-label">Fragmento relevante:</span>
          <div class="feedback-code">${fb.codigo}</div>
        </div>
        <div class="feedback-section">
          <span class="feedback-label">Por qué la respuesta correcta es esa:</span>
          <div>${fb.explicacion}</div>
        </div>
        <div class="feedback-section">
          <span class="feedback-label">Pista para corregirte sin darte la solución entera:</span>
          <div class="warn">${fb.pista}</div>
        </div>
      </div>
    `;
  }
}

function checkText(inputId, answers, resId) {
  const val = normalize(document.getElementById(inputId).value);
  const ok = answers.map(normalize).includes(val);
  const res = document.getElementById(resId);
  res.className = 'result';
  res.innerHTML = renderFeedback(inputId, ok);
}

function checkRadio(buttonElement, isCorrect, resId) {
  const res = document.getElementById(resId);
  res.className = 'result';
  res.innerHTML = renderFeedback(resId, isCorrect);
}

function showSub(id){
  document.querySelectorAll('#epica1 .sublesson').forEach(x=>x.style.display='none');
  document.getElementById(id).style.display='block';
}
function showSub6(id){
  document.querySelectorAll('#epica6 .sublesson6').forEach(x=>x.style.display='none');
  document.getElementById(id).style.display='block';
}

function showCurso(id){
  document.querySelectorAll('#curso-desde-cero .cursolesson').forEach(x=>x.style.display='none');
  document.getElementById(id).style.display='block';
}

window.addEventListener('hashchange',()=>show(location.hash));
navLinks.forEach(a=>a.addEventListener('click',e=>{show(a.getAttribute('href'));}));
updateProgress(); show(location.hash);
