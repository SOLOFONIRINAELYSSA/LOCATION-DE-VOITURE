
import pool from "../config/db.config.js";

async function create(req, res) {
  try {
    const { numLoc, nomLoc, designVoiture, nombreJour, tauxJournalier } = req.body;
    
    const [result] = await pool.query(
      "INSERT INTO table_location (numLoc, nomLoc, designVoiture, nombreJour, tauxJournalier) VALUES (?, ?, ?, ?, ?)",
      [numLoc, nomLoc, designVoiture, nombreJour, tauxJournalier]
    );
    
    res.status(201).json({ message: "Location créée", numLoc });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateOne(req, res) {
  try {
    const { numLoc } = req.params;
    const { nomLoc, designVoiture, nombreJour, tauxJournalier } = req.body;

    // Conversion des types au cas où
    const nombreJourNum = Number(nombreJour);
    const tauxJournalierNum = parseFloat(tauxJournalier);

    // Validation moins stricte
    if (!numLoc) {
      return res.status(400).json({ error: "numLoc est requis" });
    }

    // Construction dynamique de la requête
    let query = "UPDATE table_location SET ";
    const params = [];
    const updates = [];

    if (nomLoc !== undefined) {
      updates.push("nomLoc = ?");
      params.push(nomLoc);
    }
    
    if (designVoiture !== undefined) {
      updates.push("designVoiture = ?");
      params.push(designVoiture);
    }
    
    if (!isNaN(nombreJourNum)) {
      updates.push("nombreJour = ?");
      params.push(nombreJourNum);
    }
    
    if (!isNaN(tauxJournalierNum)) {
      updates.push("tauxJournalier = ?");
      params.push(tauxJournalierNum.toFixed(2));
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: "Aucune donnée à mettre à jour" });
    }

    query += updates.join(", ") + " WHERE numLoc = ?";
    params.push(numLoc);

    // Exécution
    const [result] = await pool.query(query, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Location non trouvée" });
    }

    // Récupération de la version mise à jour
    const [updated] = await pool.query(
      "SELECT * FROM table_location WHERE numLoc = ?", 
      [numLoc]
    );

    return res.status(200).json(updated[0]);

  } catch (error) {
    console.error("Erreur update:", error);
    return res.status(500).json({ 
      error: "Erreur serveur",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

async function deleteOne(req, res) {
  try {
    const { numLoc} = req.params;

    const [result] = await pool.query(
      "DELETE FROM table_location WHERE numLoc = ?",
      [numLoc]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Location non trouvé" });
    }

    return res.status(200).json({
      message: "Suppression effectuée avec succès",
    });
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur: " + error.message });
  }
}

async function getAll(req, res) {
  try {
    const [result] = await pool.query("SELECT * FROM table_location");
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur: " + error.message });
  }
}

async function getOne(req, res) {
  try {
    const { numLoc } = req.params;
    const [result] = await pool.query(
      "SELECT * FROM table_location WHERE numLoc = ?",
      [numLoc]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: "Location non trouvé" });
    }

    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur: " + error.message });
  }
}

export default {
  create,
  updateOne,
  deleteOne,
  getAll,
  getOne,
};
