;(function() {
  const entrada = document.querySelector('#entrada')
  const conteiner = document.querySelector('.conteiner-lateral')

  var saida
function criarSaida() {
  const element = document.querySelector('#saida')
  const child = document.createTextNode('')

  element.innerHTML = '' 
  element.appendChild(child) 
  
  saida = child
}

criarSaida() 

window.uiCodificar = uiCodificar
window.uiDecodificar = uiDecodificar
window.uiCopiar = uiCopiar

entrada.oninput = uiLetras


function Cod(x) {
  switch(x) {
  case 'e': return 'enter'
  case 'i': return 'imes'
  case 'a': return 'ai'
  case 'o': return 'ober'
  case 'u': return 'ufat'
  default : return x
  }
}

function codificar(s) {
  var r = ''
  for (const c of s) {
      r += Cod(c)
  }
  return r
}

function error() {
  throw new SyntaxError('Codificação inválida tente novamente')
}

function decodificar(s) {
  var r = ''
  for (var j = 0; j < s.length;) {
    switch(s[j]) {
      case 'e':
        if (s[j + 4] === 'r') { r += s[j]; j += 5 }
        else { error() }
        break
      case 'i':
        if (s[j + 3] === 's') { r += s[j]; j += 4 }
        else { error() }
        break
      case 'a':
        if (s[j + 1] === 'i') { r += s[j]; j += 2 }
        else { error()}
        break
      case 'o':
        if (s[j + 3] === 'r') { r += s[j]; j += 4 }
        else { error() }
        break
      case 'u':
        if (s[j + 3] === 't') { r += s[j]; j += 4 }
        else { error() }
        break
      default:
        r += s[j++]
    }
  }
  return r
}

function mostrarResultado() {
  conteiner.classList.add('com-saida')
}

function ocultarResultado() {
  conteiner.classList.remove('com-saida')
}




const kUnAllowed = /[^a-z ]/g
function uiLetras(ev) {
  const { inputType, target, data } = ev
  
  if (inputType === 'insertText') {
    kUnAllowed.lastIndex = 0
    if (kUnAllowed.test(data)) {
      let value = target.value
      target.value = value.substring(0, value.length - 1)
      alert('Digite apenas letras minúsculas e sem acentos')
    }
  } else if(inputType === 'insertFromPaste') {
    let value = data || target.value || ''
    value = value.toLowerCase()
    target.value = value.replace(kUnAllowed, '')
    if (target.value !== value) {
      alert('O texto foi modificado com sucesso pelos caracteres permitidos')
    }
  }
}




function uiDecodificar() {
  var txt = entrada.value
  entrada.value = ''
  if (txt.length === 0) {
    saida.nodeValue = ''
    ocultarResultado()
  } else {
    try {
      saida.nodeValue = decodificar(txt)
    } catch(O_o) {
      saida.nodeValue = ('Erro: A operação não pôde ser decodificada porque não é uma codificação válida')
    }
    mostrarResultado()
  }

}


function uiCodificar() {
  var txt = entrada.value
  entrada.value = ''
  if (txt.length === 0) {
    saida.nodeValue = ''
    ocultarResultado()
  } else {
    saida.nodeValue = codificar(txt)
    mostrarResultado()
  }
}

const kClipboard = navigator.clipboard
function uiCopiar() {
  if (kClipboard) {
    kClipboard
      .writeText(saida.nodeValue)
      .then(() => alert('copiado'))
  }
}

}())
   

 

    

    

  

 



  
 