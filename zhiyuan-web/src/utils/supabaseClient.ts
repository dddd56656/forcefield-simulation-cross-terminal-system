// src/supaClient.ts
import { createClient } from "@supabase/supabase-js";

// 下面填自己的Project URL和anon public key
const supabaseUrl = "https://blovepdmqxnmqvworcbd.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsb3ZlcGRtcXhubXF2d29yY2JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3NDU5MDAsImV4cCI6MjA3MjMyMTkwMH0.XpSf2YOxt9z-TsEyAw7baBro3gwUTZ137DregAjpkRw";
export const supabase = createClient(supabaseUrl, supabaseKey);
