"""
Script para agregar datos de muestra a la base de datos
"""
from database.connection import SessionLocal
from database.models import Initiative
import uuid

def seed_data():
    db = SessionLocal()

    # Verificar si ya hay datos
    existing_count = db.query(Initiative).count()
    if existing_count > 0:
        print(f"✓ Ya existen {existing_count} iniciativas en la base de datos")
        return

    sample_initiatives = [
        {
            "id": str(uuid.uuid4()),
            "op1": "Provide data & insights in time and in form",
            "op2": "Data definition",
            "team": "Nav",
            "op3": "Rules of the game",
            "platform": "Confluence / Adobe",
            "initiatives": "Definir las reglas del juego para la captura y procesamiento de datos de navegación",
            "c": "C1",
            "effort_level": "High",
            "resource": "PO + DA",
            "impact": "High",
            "priority": "P1",
            "order_index": 0,
        },
        {
            "id": str(uuid.uuid4()),
            "op1": "Provide data & insights in time and in form",
            "op2": "Data definition",
            "team": "Nav",
            "op3": "Nav Understanding",
            "platform": "Adobe / GCP",
            "initiatives": "Mejorar comprensión de los datos de navegación y su estructura",
            "c": "C2",
            "effort_level": "Medium",
            "resource": "DA",
            "impact": "High",
            "priority": "P1",
            "order_index": 1,
        },
        {
            "id": str(uuid.uuid4()),
            "op1": "Provide data & insights in time and in form",
            "op2": "Data capture",
            "team": "Nav + Socorp",
            "op3": "Cleanup operations in capture",
            "platform": "Adobe",
            "initiatives": "Implementar limpieza de datos en el proceso de captura para mejorar calidad",
            "c": "C1",
            "effort_level": "High",
            "resource": "DE + DA",
            "impact": "Critical",
            "priority": "P1",
            "order_index": 2,
        },
        {
            "id": str(uuid.uuid4()),
            "op1": "Provide data & insights in time and in form",
            "op2": "Data processing",
            "team": "Nav",
            "op3": "Cleanup operations in processing",
            "platform": "GCP / BigQuery",
            "initiatives": "Optimizar procesos de limpieza de datos en BigQuery para mejor performance",
            "c": "C2",
            "effort_level": "Medium",
            "resource": "DE",
            "impact": "High",
            "priority": "P2",
            "order_index": 3,
        },
        {
            "id": str(uuid.uuid4()),
            "op1": "Provide data & insights in time and in form",
            "op2": "Data assets",
            "team": "Nav + Tocorp",
            "op3": "Data catalog",
            "platform": "GCP / Dataplex",
            "initiatives": "Crear catálogo de datos para facilitar descubrimiento y uso de assets",
            "c": "C3",
            "effort_level": "High",
            "resource": "DA + DE",
            "impact": "Medium",
            "priority": "P2",
            "order_index": 4,
        },
        {
            "id": str(uuid.uuid4()),
            "op1": "Provide data & insights in time and in form",
            "op2": "FinOps",
            "team": "Socorp",
            "op3": "Cost optimization",
            "platform": "GCP",
            "initiatives": "Optimizar costos de BigQuery mediante análisis de queries y storage",
            "c": "C2",
            "effort_level": "Low",
            "resource": "DA",
            "impact": "Medium",
            "priority": "P3",
            "order_index": 5,
        },
    ]

    try:
        for init_data in sample_initiatives:
            initiative = Initiative(**init_data)
            db.add(initiative)

        db.commit()
        print(f"✓ Se agregaron {len(sample_initiatives)} iniciativas de muestra")

        # Mostrar las iniciativas creadas
        all_initiatives = db.query(Initiative).all()
        print(f"\n📊 Total de iniciativas en la base de datos: {len(all_initiatives)}")
        for init in all_initiatives:
            print(f"  - {init.op2}: {init.op3}")

    except Exception as e:
        db.rollback()
        print(f"❌ Error al agregar datos: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    print("🌱 Agregando datos de muestra...")
    seed_data()
