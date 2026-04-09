import { useState } from "react";

export default function App() {
  const [loan, setLoan] = useState(300000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(10);

  const [result, setResult] = useState(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const PHONE_NUMBER = "972501234567"; // 🔥 שים פה מספר של יועץ

  const formatNumber = (num) => {
    return num.toLocaleString("he-IL");
  };

  const calculate = () => {
    const r = rate / 100 / 12;
    const n = years * 12;

    const m = loan * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    setResult({
      monthly: Math.round(m),
      total: Math.round(m * n),
    });
  };

  const sendLead = () => {
    const message = `שלום, אני מעוניין בהלוואה\nשם: ${name}\nטלפון: ${phone}\nסכום: ${formatNumber(loan)} ש"ח`;

    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#0f172a,#1e293b)",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Arial"
    }}>

      <div style={{
        width: "400px",
        background: "#1e293b",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 0 20px rgba(0,0,0,0.4)"
      }}>

        <h2 style={{ textAlign: "center" }}>💰 מחשבון הלוואות</h2>

        <label>סכום הלוואה</label>
        <input
          value={loan}
          onChange={(e) => setLoan(Number(e.target.value))}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <label>ריבית (%)</label>
        <input
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <label>שנים</label>
        <input
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <button
          onClick={calculate}
          style={{
            width: "100%",
            padding: "12px",
            background: "#22c55e",
            border: "none",
            borderRadius: "10px",
            color: "white",
            fontWeight: "bold",
            marginBottom: "15px"
          }}
        >
          🔥 החל
        </button>

        {result && (
          <div style={{ marginBottom: "20px" }}>
            <p>💸 החזר חודשי: {formatNumber(result.monthly)} ₪</p>
            <p>📊 סה"כ תשלום: {formatNumber(result.total)} ₪</p>
          </div>
        )}

        <h3>📞 קבל הצעה מיועץ</h3>

        <input
          placeholder="שם"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          placeholder="טלפון"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <button
          onClick={sendLead}
          style={{
            width: "100%",
            padding: "12px",
            background: "#25D366",
            border: "none",
            borderRadius: "10px",
            color: "white",
            fontWeight: "bold"
          }}
        >
          📲 שלח לוואטסאפ
        </button>

      </div>
    </div>
  );
}
