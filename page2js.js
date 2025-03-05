import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabaseUrl = 'https://hhwdbjuikdvjlzywuhdc.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhod2RianVpa2R2amx6eXd1aGRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0ODMzMjksImV4cCI6MjA1MTA1OTMyOX0.LJQzoqgv8OiG-UfNFT913dpIzCm5EHFgNNIsTPPROlI"
const supabase = createClient(supabaseUrl, supabaseKey)

const bodyElement = document.querySelector('body')

async function createPlayers(equipa){
    const { data: jogadores, error } = await supabase
        .from('jogadores')
        .select('nome', 'turma', 'ign')
        .eq('equipa', equipa)
    
    var jogadoresTxt = ""
    for (let i = 0; i < jogadores.length; i++){
        jogadoresTxt += `<li><strong>${jogadores[i].ign} - ${jogadores[i].nome} - ${jogadores[i].turma}</strong></li>`
    }
    
    return jogadoresTxt
}
const { data: equipas, error } = await supabase
    .from('Equipas')
    .select('nome')
    .order('id', {ascending: true}).then((equipas) => {
        for (let i = 0; i < equipas.length; i++){
            equipasTxt += `
            <section data-bs-version="5.1" class="content8 cid-uDicwWe5wP" id="content8-j">
        
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="counter-container col-md-12 col-lg-8">
                            <h4 class="mbr-section-title mbr-fonts-style mb-4 display-5"><strong>Equipa ${i+1} - ${equipas[i]}</strong></h4>
                            <div class="mbr-text mbr-fonts-style display-7">
                                <ul>
                                    ${createPlayers(equipas[i].nome)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            `
        }   
    })


var equipasTxt = ""

for (let i = 0; i < equipas.length; i++){
    equipasTxt += `
    <section data-bs-version="5.1" class="content8 cid-uDicwWe5wP" id="content8-j">

        <div class="container">
            <div class="row justify-content-center">
                <div class="counter-container col-md-12 col-lg-8">
                    <h4 class="mbr-section-title mbr-fonts-style mb-4 display-5"><strong>Equipa ${i+1} - ${equipas[i]}</strong></h4>
                    <div class="mbr-text mbr-fonts-style display-7">
                        <ul>
                            ${await createPlayers(equipas[i].nome)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `
}   

bodyElement.innerHTML.replace("A carregar equipas...", equipasTxt)