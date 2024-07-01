import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://yuyyujadubndgfpxauug.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1eXl1amFkdWJuZGdmcHhhdXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc2NjA4MzUsImV4cCI6MjAzMzIzNjgzNX0.V8bBPKuA3fXB10LcA1inEJRDAv96y-ePQaNdpaKO0yo";

export const supabase = createClient(supabaseUrl, supabaseKey);
export async function getComuni() {
  let { data: comune, error } = await supabase.from("comune").select("*");
  if (error) console.error("Error", error ?? "Non ci sono errori");
  // console.log("TCL: getCountries -> ", comune);
}

export const getUtente = async (setUser) => {
  let { data: utente, error } = await supabase
    .from("utente")
    .select("*")
    .limit(1);
  if (utente) {
    console.log(utente[0]);
    setUser((u) => utente[0]);
  }
};
