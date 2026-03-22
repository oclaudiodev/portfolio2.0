import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "./VisitCounter.css";

export default function VisitCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const increment = async () => {
      const VISIT_KEY = "visit_counted";
      const alreadyCounted = localStorage.getItem(VISIT_KEY);

      const { data, error } = await supabase
        .from("visits")
        .select("id, count")
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Erro ao buscar:", error);
        return;
      }

      // 👉 Se não existir registro, cria um
      if (!data) {
        const { data: newData, error: insertError } = await supabase
          .from("visits")
          .insert([{ count: 1 }])
          .select()
          .single();

        if (insertError) {
          console.error("Erro ao criar contador:", insertError);
          return;
        }

        localStorage.setItem(VISIT_KEY, "true");
        setCount(1);
        return;
      }

      let currentCount = data.count;

      // 👉 Incrementa só uma vez por usuário
      if (!alreadyCounted) {
        const newCount = currentCount + 1;

        const { error: updateError } = await supabase
          .from("visits")
          .update({ count: newCount })
          .eq("id", data.id);

        if (updateError) {
          console.error("Erro ao atualizar:", updateError);
          return;
        }

        localStorage.setItem(VISIT_KEY, "true");
        currentCount = newCount;
      }

      setCount(currentCount);
    };

    increment();
  }, []);

  if (count === null) return null;

  return (
    <div className="visit-counter">
      <span className="visit-dot" />
      <span className="visit-text">
        <span className="visit-number">{count.toLocaleString()}</span> visitas
      </span>
    </div>
  );
}