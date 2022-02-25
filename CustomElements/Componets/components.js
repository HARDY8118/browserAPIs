class Custom extends HTMLElement{
    constructor(){
        super()
        this.innerHTML=this.getAttribute('data')
    }
}

window.customElements.define('custom-element',Custom)

const template=document.createElement('template')
template.innerHTML=`
    <style>
        h3{
            color: yellow;
        }
    </style>
    <div>
        <h3>
        </h3>

        <span class='data1'><slot name="3"/></span>

        <span class='data2'><slot name="2"></span>
    </div>
`

class CustomComponent extends HTMLElement{

    constructor(){
        super()
        // Shadow DOM
        this.attachShadow({mode:'open'})
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.shadowRoot.querySelector('h3').innerText=this.getAttribute('data')
    }
    connectedCallback(){
        this.shadowRoot.querySelector('h3').addEventListener('click',()=>{
            alert()
        })
    }
    disconnectedCallback(){
        this.shadowRoot.querySelector('h3').removeEventListener();
    }
}

window.customElements.define('custom-component',CustomComponent)
