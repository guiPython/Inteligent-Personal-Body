import { ipcRenderer , remote } from "electron"
import Chart from "chart.js"

let win = remote.getCurrentWindow();
let webContent = remote.getCurrentWebContents()
const cliente = JSON.parse(sessionStorage.getItem("cliente") as string) as any
const usuario = JSON.parse(sessionStorage.getItem("user") as string) as any

function inverter(s:string) {
    return s.split("-").reverse().join('/');
}

function logout ( webContent : Electron.WebContents ):void{
    webContent.goToIndex(0);
    webContent.clearHistory();
}

function backPage ( webContent : Electron.WebContents ):void{
    webContent.goBack();
}

function minimizeWindow( browserWindow : Electron.BrowserWindow ):void{
    if ( browserWindow.minimizable ){
        browserWindow.minimize()
    }
}

function maximizeWindow( browserWindow : Electron.BrowserWindow ):void{
    if ( browserWindow.maximizable ){
        //browserWindow.maximize()
    }
}

function closeWindow( browserWindow : Electron.BrowserWindow ):void{
    browserWindow.close()
    ipcRenderer.send("window-all-closed")
}

function isWindowMaximized( browserWindow : Electron.BrowserWindow ):boolean{
    return browserWindow.isMaximized()
}

document.addEventListener("DOMContentLoaded",()=>{

    const minimizeButton = document.getElementById("minimize") as HTMLElement;
    const maxUnmaxButton = document.getElementById("maximize") as HTMLElement;
    const closeButton = document.getElementById("close") as HTMLElement;
    const goBackButton = document.getElementById("goback") as HTMLElement;
    const logOutButton = document.getElementById("logout") as HTMLElement;
    const bvn = document.querySelector("#presentation") as HTMLElement;
    const altura = document.getElementById("alturaH") as HTMLElement;
    const peso = document.getElementById("pesoH") as HTMLElement;
    const imc = document.getElementById("imcH") as HTMLElement;
    const divMedidas = document.getElementById("graficoMedidas") as HTMLElement;
    const nome = document.getElementById("nomeH") as HTMLElement
    const cpf =  document.getElementById("cpfH") as HTMLElement
    const dataNasc = document.getElementById("dataNascH") as HTMLElement
    const btnUpdateCliente = document.getElementById("updateCliente")

    bvn.innerHTML = `IPB - ${cliente.nome}`

    if (cliente.medidas.length != 0 ){
        divMedidas.innerHTML = '<canvas id="grafico_1" width="1061.33" height="400"></canvas>'
        Chart.defaults.global.defaultFontColor = 'black';
        Chart.defaults.global.defaultFontSize  = 15;
        var ctx = document.getElementById("grafico_1") as HTMLCanvasElement;
        var lastMedida = cliente.medidas[cliente.medidas.length - 1 ]
        var dataSetPeso : any = []
        var dataSetIMC : any = []
        cliente.medidas.map( ( e : any ) => { 
            dataSetPeso.push({x:e.createdAt ,  y:e.peso})
            dataSetIMC.push({x:e.createdAt , y:(e.peso/e.altura**2).toFixed(2)})
        })

        nome.innerHTML = `Nome: ${cliente.nome}`
        cpf.innerHTML = `CPF: ${cliente.cpf}`
        dataNasc.innerHTML =  `Data de Nascimento: ${inverter(new Date(cliente.data_nascimento).toISOString().split("T")[0])}`
        altura.innerHTML = `Altura: ${lastMedida.altura} m`
        peso.innerHTML = `Peso: ${lastMedida.peso} Kg`
        imc.innerHTML = `IMC: ${(lastMedida.peso/lastMedida.altura**2).toFixed(2)} Kg.m<sup>-2</sup>`

        var dataSetGeral : any = 
        [   {
                label:"Peso",
                backgroundColor: '#ff6384',
                borderColor: '#ff6384',
                data: dataSetPeso,
            },
            {
                label:"IMC",
                backgroundColor: '#ff6384',
                borderColor: '#ff6384',
                data:dataSetIMC,
            }
        ]

        var chart = new Chart(ctx,{
                type:"line",
                data:{
                    labels: ['Jan', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Agt', 'Set', 'Out', 'Nov', 'Dez'],
                    datasets:dataSetGeral
                },
                options:{
                    responsive:true,
                    scales:{
                        xAxes:[{
                            display:true,
                            scaleLabel:{
                                display:true,
                                labelString:"Month"
                            }
                        }],
                        yAxes:[{
                            display:true,
                            scaleLabel:{
                                display:true,
                                labelString:"Value"
                            }
                        }]
                    }
                }
            })

            
    }
    else{
        divMedidas.innerHTML = '<h3> Sem Medidas </h3>'
    }
    logOutButton.addEventListener("click", e =>  {
        logout(webContent);
    })

    goBackButton.addEventListener("click" , e => {
        sessionStorage.removeItem("cliente")
        backPage(webContent);
    })

    minimizeButton.addEventListener("click", e => {
        minimizeWindow(win);
    });

    maxUnmaxButton.addEventListener("click", e => {
        const icon = maxUnmaxButton.querySelector("i.far") as HTMLElement;

        maximizeWindow(win);

        if (isWindowMaximized(win)) {
            icon.classList.remove("fa-square");
            icon.classList.add("fa-clone");
        } else {
            icon.classList.add("fa-square");
            icon.classList.remove("fa-clone");
        }
    });

    closeButton.addEventListener("click", e => {
        closeWindow(win);
    });

})  

