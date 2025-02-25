import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabaseUrl = 'https://hhwdbjuikdvjlzywuhdc.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhod2RianVpa2R2amx6eXd1aGRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0ODMzMjksImV4cCI6MjA1MTA1OTMyOX0.LJQzoqgv8OiG-UfNFT913dpIzCm5EHFgNNIsTPPROlI"
const supabase = createClient(supabaseUrl, supabaseKey)

const autoupdatescore = supabase.channel('custom-update-channel-2')
  .on(
    'postgres_changes',
    { event: 'UPDATE', schema: 'public', table: 'Equipas' },
    (payload) => {
      console.log('Change received!', payload)
      window.location.reload();
    }
  )
  .subscribe()

async function fetchTeamScore(teamName) {
    const { data, error } = await supabase
      .from('Equipas')
      .select()
      .eq('nome', teamName)
      .single();
  
    if (error) {
      console.error(`Error fetching score for team ID: ${teamName}`, error);
      return null;
    }
  
    return data.pontos;
}

// Ronda 1
let { data: ronda1names, error1 } = await supabase
    .from('bracket')
    .select('ronda1nome')
    .order('id', {ascending: true})

for (let i = 0; i < ronda1names.length; i++){
    document.getElementById(`teamname1${i+1}`).innerHTML = ronda1names[i].ronda1nome + document.getElementById(`teamname1${i+1}`).innerHTML
    document.getElementById(`teamscore1${i+1}`).textContent = await fetchTeamScore(ronda1names[i].ronda1nome)
}

// Ronda 2
let { data: ronda2names, error: error2 } = await supabase
    .from('bracket')
    .select('ronda2nome')
    .order('id', {ascending: true})

for (let i = 0; i < ronda2names.length/2; i++){
    document.getElementById(`teamname2${i+1}`).innerHTML = ronda2names[i].ronda2nome + document.getElementById(`teamname2${i+1}`).innerHTML
    document.getElementById(`teamscore2${i+1}`).textContent = await fetchTeamScore(ronda2names[i].ronda2nome)
}

// Ronda 3
let { data: ronda3names, error: error3 } = await supabase
    .from('bracket')
    .select('ronda3nome')
    .order('id', {ascending: true})

for (let i = 0; i < ronda3names.length/4; i++){
    document.getElementById(`teamname3${i+1}`).innerHTML = ronda3names[i].ronda3nome + document.getElementById(`teamname3${i+1}`).innerHTML
    document.getElementById(`teamscore3${i+1}`).textContent = await fetchTeamScore(ronda3names[i].ronda3nome)
}

