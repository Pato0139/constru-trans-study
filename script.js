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
  'curso1-q1': {
    section: 'Curso desde Cero — Lección 1',
    subapartado: 'Ejercicios interactivos de prueba',
    fragmento: 'python --version',
    explicacion: 'El comando para comprobar la versión de Python es python --version o py --version (también funciona python -V o py -V).',
    pista: 'Mira la sección “3. Comprobar que Python está instalado”.',
    codigo: 'python --version'
  },
  'res-curso1-q1': {
    section: 'Curso desde Cero — Lección 1',
    subapartado: 'Ejercicios interactivos de prueba',
    fragmento: 'python --version',
    explicacion: 'El comando para comprobar la versión de Python es python --version o py --version (también funciona python -V o py -V).',
    pista: 'Mira la sección “3. Comprobar que Python está instalado”.',
    codigo: 'python --version'
  },
  'curso1-q2': {
    section: 'Curso desde Cero — Lección 1',
    subapartado: 'Ejercicios interactivos de prueba',
    fragmento: 'python -m venv venv',
    explicacion: 'El comando para crear un entorno virtual es python -m venv venv o py -m venv venv.',
    pista: 'Mira la sección “6. Crear y activar un entorno virtual”.',
    codigo: 'python -m venv venv'
  },
  'res-curso1-q2': {
    section: 'Curso desde Cero — Lección 1',
    subapartado: 'Ejercicios interactivos de prueba',
    fragmento: 'python -m venv venv',
    explicacion: 'El comando para crear un entorno virtual es python -m venv venv o py -m venv venv.',
    pista: 'Mira la sección “6. Crear y activar un entorno virtual”.',
    codigo: 'python -m venv venv'
  },
  'res-curso1-q3': {
    section: 'Curso desde Cero — Lección 1',
    subapartado: 'Ejercicios interactivos de prueba',
    fragmento: 'venv\\Scripts\\Activate.ps1',
    explicacion: 'En PowerShell, el comando para activar el entorno virtual es venv\\Scripts\\Activate.ps1.',
    pista: 'Mira la sección “6. Crear y activar un entorno virtual” — Paso 2.',
    codigo: 'venv\\Scripts\\Activate.ps1'
  },
  'curso1-q4': {
    section: 'Curso desde Cero — Lección 1',
    subapartado: 'Ejercicios interactivos de prueba',
    fragmento: 'pip list',
    explicacion: 'El comando para ver los paquetes instalados en el entorno virtual es pip list.',
    pista: 'Mira la sección “7. ¿Qué es pip?”',
    codigo: 'pip list'
  },
  'res-curso1-q4': {
    section: 'Curso desde Cero — Lección 1',
    subapartado: 'Ejercicios interactivos de prueba',
    fragmento: 'pip list',
    explicacion: 'El comando para ver los paquetes instalados en el entorno virtual es pip list.',
    pista: 'Mira la sección “7. ¿Qué es pip?”',
    codigo: 'pip list'
  },
  'vscode-q1': {
    section: 'Guía VS Code',
    subapartado: 'Paso 3: Crear el entorno virtual',
    fragmento: 'py -m venv venv',
    explicacion: 'El comando para crear un entorno virtual en Windows es py -m venv venv (o python -m venv venv).',
    pista: 'Mira el comando en la sección “Lo que tienes que hacer” del Paso 3.',
    codigo: 'py -m venv venv'
  },
  'vscode-q2': {
    section: 'Guía VS Code',
    subapartado: 'Paso 6: Opcional — Crear el proyecto Django',
    fragmento: 'django-admin startproject core .',
    explicacion: 'El comando para crear un proyecto Django en la carpeta actual es django-admin startproject NOMBRE . (el punto es importante!).',
    pista: 'Recuerda: django-admin startproject core .',
    codigo: 'django-admin startproject core .'
  },
  'curso3-q1': {
    section: 'Curso desde Cero — Django Básico',
    subapartado: 'Ejercicio 1',
    fragmento: 'django-admin startproject mi_proyecto .',
    explicacion: 'El comando para crear un proyecto Django llamado mi_proyecto en la carpeta actual incluye el punto al final.',
    pista: 'Recuerda: django-admin startproject NOMBRE .',
    codigo: 'django-admin startproject mi_proyecto .'
  },
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
  'res-e1q1': {
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
  'res-e1q3': {
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
  'res-e6q1': {
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
  'res-e6q3': {
    section: 'Épica 6 · Pago, estado e historial',
    subapartado: 'Código real',
    fragmento: 'def saldo_pendiente(self): return self.total - self.total_pagado',
    explicacion: 'El saldo pendiente se calcula restando el total pagado al total de la factura.',
    pista: 'Busca la propiedad @property "saldo_pendiente" en el modelo Factura.',
    codigo: 'class Factura(models.Model):\n    @property\n    def total_pagado(self):\n        return sum(p.monto for p in self.pagos.all())\n\n    @property\n    def saldo_pendiente(self):\n        return self.total - self.total_pagado'
  },
  'zona3-q1': {
    section: 'Zona 3: Setup Real',
    subapartado: 'Ejercicio 2: Entorno virtual',
    fragmento: 'py -m venv venv',
    explicacion: 'El comando para crear un entorno virtual en Windows es py -m venv venv (o python -m venv venv).',
    pista: 'Mira la sección “Comandos (Windows)” del Paso 2.',
    codigo: 'py -m venv venv'
  },
  'res-zona3-q2': {
    section: 'Zona 3: Setup Real',
    subapartado: 'Ejercicio 4: .env',
    fragmento: '.env.example',
    explicacion: 'Para crear el archivo .env, debes copiar el archivo .env.example y renombrarlo a .env.',
    pista: 'Mira la sección “Paso 4: Configurar el archivo .env”.',
    codigo: '.env.example'
  },
  'zona3-q3': {
    section: 'Zona 3: Setup Real',
    subapartado: 'Ejercicio 5: Migraciones y superusuario',
    fragmento: 'python manage.py migrate',
    explicacion: 'El comando para aplicar migraciones es python manage.py migrate.',
    pista: 'Mira la sección “Comandos” del Paso 5.',
    codigo: 'python manage.py migrate'
  },
  'zona4-q2': {
    section: 'Zona 4: MER Completo',
    subapartado: 'Ejercicio 2: Usuario y User',
    fragmento: 'OneToOneField',
    explicacion: 'La relación entre User y Usuario es un OneToOneField (uno a uno).',
    pista: 'Mira el código real: models.OneToOneField',
    codigo: 'user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="usuario")'
  },
  'res-zona4-q1': {
    section: 'Zona 4: MER Completo',
    subapartado: 'Ejercicio 1: Tipos de relación',
    fragmento: '1:1',
    explicacion: 'La relación entre User y Usuario es 1:1 (uno a uno).',
    pista: 'Mira la explicación de tipos de relación en el Paso 1.',
    codigo: 'class Usuario(models.Model):\n    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="usuario")'
  },
  'res-zona4-q3': {
    section: 'Zona 4: MER Completo',
    subapartado: 'Ejercicio 3: Cliente y Conductor',
    fragmento: 'Ambos extienden a Usuario con OneToOneField',
    explicacion: 'Tanto Cliente como Conductor extienden a Usuario mediante una relación OneToOneField.',
    pista: 'Mira el código real de Cliente y Conductor.',
    codigo: 'class Cliente(models.Model):\n    usuario = models.OneToOneField(\'usuarios.Usuario\', on_delete=models.CASCADE, primary_key=True, related_name=\'perfil_cliente\')\n\nclass Conductor(models.Model):\n    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, primary_key=True, related_name=\'perfil_conductor\')'
  },
  'zona6-q1': {
    section: 'Zona 6: Épica 2 — Materiales e Inventario',
    subapartado: 'Ejercicio 1: MaterialConstruccion',
    fragmento: 'cod_material',
    explicacion: 'El campo clave primaria de MaterialConstruccion es cod_material.',
    pista: 'Mira el código: cod_material = models.AutoField(primary_key=True)',
    codigo: 'cod_material = models.AutoField(primary_key=True)'
  },
  'res-zona6-q2': {
    section: 'Zona 6: Épica 2 — Materiales e Inventario',
    subapartado: 'Ejercicio 2: Stock',
    fragmento: '1:1',
    explicacion: 'La relación entre Material y Stock es 1:1 (uno a uno).',
    pista: 'Mira el código real de Stock.',
    codigo: 'class Stock(models.Model):\n    material = models.OneToOneField(MaterialConstruccion, on_delete=models.CASCADE, primary_key=True, related_name=\'stock_info\')'
  },
  'final1': {
    section: 'Épica 6 · Registrar pago',
    subapartado: 'Código real',
    fragmento: 'def registrar_pago(request):',
    explicacion: 'La función que registra los pagos se llama registrar_pago.',
    pista: 'Busca el nombre de la vista en el código de facturación/pagos.',
    codigo: '@login_required\n@require_POST\ndef registrar_pago(request):'
  },
  'final1r': {
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
  'final2r': {
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
  },
  'final3r': {
    section: 'Épica 6 · De pedido a factura',
    subapartado: 'Código real',
    fragmento: 'class Factura(models.Model):',
    explicacion: 'El modelo financiero principal es Factura.',
    pista: 'Busca el modelo que maneja subtotal, IVA, total y estado de pago.',
    codigo: 'class Factura(models.Model):\n    pedido = models.OneToOneField(\'ordenes.Pedido\', ...)\n    cliente = models.ForeignKey(\'usuarios.Usuario\', ...)\n    subtotal = models.DecimalField(...)\n    iva = models.DecimalField(...)\n    total = models.DecimalField(...)\n    estado = models.CharField(...)'
  },
  'zona7-q1': {
    section: 'Zona 7 — Épica 3: Pedidos',
    subapartado: 'Ejercicio 1: Estados del Pedido',
    fragmento: 'pendiente, en_ruta, entregado, cancelado',
    explicacion: 'Los 4 estados posibles de un pedido son pendiente, en_ruta, entregado y cancelado.',
    pista: 'Mira el código: ESTADOS = [...]',
    codigo: "ESTADOS = [\n        ('pendiente', 'Pendiente'),\n        ('en_ruta', 'En Ruta'),\n        ('entregado', 'Entregado'),\n        ('cancelado', 'Cancelado'),\n    ]"
  },
  'res-zona7-q1': {
    section: 'Zona 7 — Épica 3: Pedidos',
    subapartado: 'Ejercicio 1: Estados del Pedido',
    fragmento: 'pendiente, en_ruta, entregado, cancelado',
    explicacion: 'Los 4 estados posibles de un pedido son pendiente, en_ruta, entregado y cancelado.',
    pista: 'Mira el código: ESTADOS = [...]',
    codigo: "ESTADOS = [\n        ('pendiente', 'Pendiente'),\n        ('en_ruta', 'En Ruta'),\n        ('entregado', 'Entregado'),\n        ('cancelado', 'Cancelado'),\n    ]"
  },
  'zona7-q2': {
    section: 'Zona 7 — Épica 3: Pedidos',
    subapartado: 'Ejercicio 2: Subtotal',
    fragmento: 'cantidad * precio_unitario',
    explicacion: 'El subtotal de un DetallePedido se calcula multiplicando la cantidad por el precio unitario.',
    pista: 'Mira el @property subtotal',
    codigo: '@property\ndef subtotal(self):\n    return self.cantidad * self.precio_unitario'
  },
  'res-zona7-q2': {
    section: 'Zona 7 — Épica 3: Pedidos',
    subapartado: 'Ejercicio 2: Subtotal',
    fragmento: 'cantidad * precio_unitario',
    explicacion: 'El subtotal de un DetallePedido se calcula multiplicando la cantidad por el precio unitario.',
    pista: 'Mira el @property subtotal',
    codigo: '@property\ndef subtotal(self):\n    return self.cantidad * self.precio_unitario'
  },
  'zona7-q3': {
    section: 'Zona 7 — Épica 3: Pedidos',
    subapartado: 'Ejercicio 3: F() expressions',
    fragmento: 'F',
    explicacion: 'La función F() se usa para evitar race conditions al modificar el stock directamente en la base de datos.',
    pista: 'Mira el código: F("cantidad_actual")',
    codigo: 'stock_obj.cantidad_actual = F(\'cantidad_actual\') - cantidad'
  },
  'res-zona7-q3': {
    section: 'Zona 7 — Épica 3: Pedidos',
    subapartado: 'Ejercicio 3: F() expressions',
    fragmento: 'F',
    explicacion: 'La función F() se usa para evitar race conditions al modificar el stock directamente en la base de datos.',
    pista: 'Mira el código: F("cantidad_actual")',
    codigo: 'stock_obj.cantidad_actual = F(\'cantidad_actual\') - cantidad'
  },
  'zona8-q1': {
    section: 'Zona 8 — Épica 4: Transporte',
    subapartado: 'Ejercicio 1: Placa única',
    fragmento: 'placa',
    explicacion: 'El campo único del Vehiculo es la placa.',
    pista: 'Mira el código: placa = models.CharField(..., unique=True)',
    codigo: 'placa = models.CharField(max_length=10, unique=True)'
  },
  'res-zona8-q1': {
    section: 'Zona 8 — Épica 4: Transporte',
    subapartado: 'Ejercicio 1: Placa única',
    fragmento: 'placa',
    explicacion: 'El campo único del Vehiculo es la placa.',
    pista: 'Mira el código: placa = models.CharField(..., unique=True)',
    codigo: 'placa = models.CharField(max_length=10, unique=True)'
  },
  'res-zona8-q2': {
    section: 'Zona 8 — Épica 4: Transporte',
    subapartado: 'Ejercicio 2: Relación N:M',
    fragmento: 'N:M (tabla puente)',
    explicacion: 'La relación entre Conductor y Vehiculo es muchos a muchos, con la tabla puente ConductorVehiculo.',
    pista: 'Mira el modelo ConductorVehiculo',
    codigo: 'class ConductorVehiculo(models.Model):\n    conductor = models.ForeignKey(Conductor, ...)\n    vehiculo = models.ForeignKey(Vehiculo, ...)'
  },
  'zona9-q1': {
    section: 'Zona 9 — Épica 5: Proveedores y Compras',
    subapartado: 'Ejercicio 1: PK de Proveedor',
    fragmento: 'nit',
    explicacion: 'La clave primaria de Proveedor es el NIT.',
    pista: 'Mira el código: nit = models.CharField(..., primary_key=True)',
    codigo: 'nit = models.CharField(max_length=50, primary_key=True)'
  },
  'res-zona9-q1': {
    section: 'Zona 9 — Épica 5: Proveedores y Compras',
    subapartado: 'Ejercicio 1: PK de Proveedor',
    fragmento: 'nit',
    explicacion: 'La clave primaria de Proveedor es el NIT.',
    pista: 'Mira el código: nit = models.CharField(..., primary_key=True)',
    codigo: 'nit = models.CharField(max_length=50, primary_key=True)'
  },
  'zona9-q2': {
    section: 'Zona 9 — Épica 5: Proveedores y Compras',
    subapartado: 'Ejercicio 2: Calcular total',
    fragmento: 'calcular_total',
    explicacion: 'El método que calcula el total de una Compra es calcular_total().',
    pista: 'Mira el método def calcular_total(self):',
    codigo: 'def calcular_total(self):\n    self.total_compra = sum(d.subtotal for d in self.detalles.all())\n    self.save()\n    return self.total_compra'
  },
  'res-zona9-q2': {
    section: 'Zona 9 — Épica 5: Proveedores y Compras',
    subapartado: 'Ejercicio 2: Calcular total',
    fragmento: 'calcular_total',
    explicacion: 'El método que calcula el total de una Compra es calcular_total().',
    pista: 'Mira el método def calcular_total(self):',
    codigo: 'def calcular_total(self):\n    self.total_compra = sum(d.subtotal for d in self.detalles.all())\n    self.save()\n    return self.total_compra'
  },
  'res-zona11-q1': {
    section: 'Zona 11 — Épica 7: Reportes e Historial',
    subapartado: 'Ejercicio 1: Acciones del Historial',
    fragmento: 'crear, editar, eliminar, login',
    explicacion: 'Algunas de las acciones que registra el Historial son crear, editar, eliminar, login y logout.',
    pista: 'Mira el código: ACCIONES = [...]',
    codigo: 'ACCIONES = [\n        (\'crear\', \'Crear\'),\n        (\'editar\', \'Editar\'),\n        (\'eliminar\', \'Eliminar\'),\n        (\'login\', \'Inicio de sesión\'),\n        (\'logout\', \'Cierre de sesión\'),\n        (\'otro\', \'Otro\'),\n    ]'
  },
  'zona11-q2': {
    section: 'Zona 11 — Épica 7: Reportes e Historial',
    subapartado: 'Ejercicio 2: Tipos de Reporte',
    fragmento: 'inventario, ventas, compras, entregas, financiero',
    explicacion: 'Los tipos de reporte son inventario, ventas, compras, entregas y financiero.',
    pista: 'Mira el código: TIPOS = [...]',
    codigo: "TIPOS = [\n        ('inventario', 'Inventario'),\n        ('ventas', 'Ventas'),\n        ('compras', 'Compras'),\n        ('entregas', 'Entregas'),\n        ('financiero', 'Financiero'),\n    ]"
  },
  'res-zona11-q2': {
    section: 'Zona 11 — Épica 7: Reportes e Historial',
    subapartado: 'Ejercicio 2: Tipos de Reporte',
    fragmento: 'inventario, ventas, compras, entregas, financiero',
    explicacion: 'Los tipos de reporte son inventario, ventas, compras, entregas y financiero.',
    pista: 'Mira el código: TIPOS = [...]',
    codigo: "TIPOS = [\n        ('inventario', 'Inventario'),\n        ('ventas', 'Ventas'),\n        ('compras', 'Compras'),\n        ('entregas', 'Entregas'),\n        ('financiero', 'Financiero'),\n    ]"
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

function checkText(inputId, arg2, arg3, arg4) {
  let answers, resId;
  if (typeof arg4 !== 'undefined') {
    if (inputId === 'vscode-q1' || inputId === 'zona3-q1') {
      answers = ['py -m venv venv', 'python -m venv venv'];
    } else if (inputId === 'zona3-q3') {
      answers = ['python manage.py migrate', 'py manage.py migrate'];
    } else {
      answers = [arg2];
    }
    resId = 'res-' + inputId;
  } else {
    answers = Array.isArray(arg2) ? arg2 : [arg2];
    resId = arg3;
  }
  const val = normalize(document.getElementById(inputId).value);
  const ok = answers.map(normalize).includes(val);
  const res = document.getElementById(resId);
  if (res) {
    res.className = 'result';
    res.innerHTML = renderFeedback(inputId, ok);
  }
}

function checkRadio(arg1, arg2, arg3) {
  let isCorrect, resId;
  if (typeof arg1 === 'object' && arg1 !== null) {
    isCorrect = arg2;
    resId = arg3;
  } else {
    const quizId = arg1;
    const correctAnswer = arg2;
    resId = arg3;
    const selected = document.querySelector(`input[name="${quizId}"]:checked`);
    isCorrect = selected && selected.value === correctAnswer;
  }
  const res = document.getElementById(resId);
  if (res) {
    res.className = 'result';
    const feedbackId = resId.startsWith('res-') ? resId : 'res-' + resId;
    res.innerHTML = renderFeedback(feedbackId, isCorrect);
  }
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
