"""
Script para agregar las 11 iniciativas faltantes de la tabla
"""
from database.connection import SessionLocal
from database.models import Initiative
import uuid

def add_missing_initiatives():
    db = SessionLocal()

    # Las 11 iniciativas faltantes de la imagen
    new_initiatives = [
        # Data definition (3 adicionales)
        {
            "id": str(uuid.uuid4()),
            "op1": "Provide data & insights in time and in form",
            "op2": "Data definition",
            "team": "Nav",
            "op3": "MKT Attribution",
            "platform": "Layer/GCP",
            "initiatives": "Node_id variable definition: the context",
            "c": "",
            "effort_level": "",
            "resource": "DA + DE",
            "impact": "",
            "priority": "TBD",
            "order_index": 6,
        },
        {
            "id": str(uuid.uuid4()),
            "op1": "Provide data & insights in time and in form",
            "op2": "Data definition",
            "team": "Nav",
            "op3": "Missing key vars",
            "platform": "Adobe / GCP",
            "initiatives": "Site tag : exit from page to page",
            "c": "",
            "effort_level": "",
            "resource": "PO",
            "impact": "",
            "priority": "TBD",
            "order_index": 7,
        },
        {
            "id": str(uuid.uuid4()),
            "op1": "Provide data & insights in time and in form",
            "op2": "Data definition",
            "team": "Nav",
            "op3": "Change control",
            "platform": "Slack/Teams",
            "initiatives": "Whenever a site alteration occurs, it might or might not affect data; need better communication and protocols of quality rules. -> define and track",
            "c": "",
            "effort_level": "",
            "resource": "PO",
            "impact": "",
            "priority": "TBD",
            "order_index": 8,
        },
        # Data capture (adicional)
        {
            "id": str(uuid.uuid4()),
            "op1": "Provide data & insights in time and in form",
            "op2": "Data capture",
            "team": "Nav",
            "op3": "Cleanup operations in capture",
            "platform": "Adobe / GCP",
            "initiatives": "LifeCycle variables filter - this affects CTR & BounceRate (ghost hits)",
            "c": "C1",
            "effort_level": "",
            "resource": "DE",
            "impact": "",
            "priority": "TBD",
            "order_index": 9,
        },
        # Data processing (4 adicionales)
        {
            "id": str(uuid.uuid4()),
            "op1": "Provide data & insights in time and in form",
            "op2": "Data processing",
            "team": "Nav",
            "op3": "Cleanup operations in processing",
            "platform": "Adobe / GCP",
            "initiatives": "LifeCycle variables filter - this affects CTR & BounceRate (ghost hits)",
            "c": "",
            "effort_level": "",
            "resource": "DE",
            "impact": "",
            "priority": "TBD",
            "order_index": 10,
        },
        {
            "id": str(uuid.uuid4()),
            "op1": "Provide data & insights in time and in form",
            "op2": "Data processing",
            "team": "Nav",
            "op3": "Definitions of entities for consumption",
            "platform": "GCP",
            "initiatives": "User friendly entity(s) per team and use case -> easy consumption (i.e. funnel)",
            "c": "",
            "effort_level": "",
            "resource": "DE + PO",
            "impact": "",
            "priority": "TBD",
            "order_index": 11,
        },
        {
            "id": str(uuid.uuid4()),
            "op1": "Provide data & insights in time and in form",
            "op2": "Data processing",
            "team": "Nav + Socorp",
            "op3": "No andes tables",
            "platform": "GCP",
            "initiatives": "Busines rules for matching concepts between countries (Sod)",
            "c": "",
            "effort_level": "",
            "resource": "DE + PO",
            "impact": "",
            "priority": "TBD",
            "order_index": 12,
        },
        {
            "id": str(uuid.uuid4()),
            "op1": "Provide data & insights in time and in form",
            "op2": "Data processing",
            "team": "Nav",
            "op3": "Change control",
            "platform": "Dataplex",
            "initiatives": "Quality rules definition and incorporations into pipelines; not nonli counts of records, but metric relevant to each page.",
            "c": "C1",
            "effort_level": "Medium",
            "resource": "DE + DG",
            "impact": "High",
            "priority": "TBD",
            "order_index": 13,
        },
        {
            "id": str(uuid.uuid4()),
            "op1": "Provide data & insights in time and in form",
            "op2": "Data processing",
            "team": "Nav + Tocorp + FSC",
            "op3": "New tables",
            "platform": "GCP",
            "initiatives": "Clickstream process: FSC & TOAPP",
            "c": "",
            "effort_level": "",
            "resource": "DE",
            "impact": "",
            "priority": "TBD",
            "order_index": 14,
        },
        # Data assets (5 adicionales)
        {
            "id": str(uuid.uuid4()),
            "op1": "Provide data & insights in time and in form",
            "op2": "Data assets",
            "team": "Nav",
            "op3": "MKT Attribution",
            "platform": "Layer/GCP",
            "initiatives": "Node_id variable creation & integration + site_tags",
            "c": "",
            "effort_level": "",
            "resource": "DA + DE",
            "impact": "",
            "priority": "TBD",
            "order_index": 15,
        },
        {
            "id": str(uuid.uuid4()),
            "op1": "Provide data & insights in time and in form",
            "op2": "Data assets",
            "team": "Nav",
            "op3": "Platform Access",
            "platform": "Genuine",
            "initiatives": "Generate workflow to automate AA access",
            "c": "",
            "effort_level": "High",
            "resource": "DE",
            "impact": "Medium",
            "priority": "TBD",
            "order_index": 16,
        },
        {
            "id": str(uuid.uuid4()),
            "op1": "Provide data & insights in time and in form",
            "op2": "Data assets",
            "team": "Nav",
            "op3": "Search dashboard",
            "platform": "GCP",
            "initiatives": "Generate findability-like table for search consumption",
            "c": "",
            "effort_level": "",
            "resource": "DA",
            "impact": "",
            "priority": "TBD",
            "order_index": 17,
        },
        {
            "id": str(uuid.uuid4()),
            "op1": "Provide data & insights in time and in form",
            "op2": "Data assets",
            "team": "Nav",
            "op3": "Nav control tower",
            "platform": "AI",
            "initiatives": "Dashboards to understand navigation & quality",
            "c": "",
            "effort_level": "Medium",
            "resource": "DA",
            "impact": "High",
            "priority": "TBD",
            "order_index": 18,
        },
        {
            "id": str(uuid.uuid4()),
            "op1": "Provide data & insights in time and in form",
            "op2": "Data assets",
            "team": "Nav",
            "op3": "Cleanup",
            "platform": "GCP",
            "initiatives": "Delete v3 clickstreams",
            "c": "",
            "effort_level": "",
            "resource": "DE + DG",
            "impact": "",
            "priority": "TBD",
            "order_index": 19,
        },
        # FinOps (1 adicional)
        {
            "id": str(uuid.uuid4()),
            "op1": "Provide data & insights in time and in form",
            "op2": "FinOps",
            "team": "Nav",
            "op3": "Adobe Customer Journey",
            "platform": "AEP",
            "initiatives": "Define cost and administrative process to have go - no go before march",
            "c": "C1",
            "effort_level": "",
            "resource": "PO",
            "impact": "High",
            "priority": "TBD",
            "order_index": 20,
        },
    ]

    try:
        for init_data in new_initiatives:
            initiative = Initiative(**init_data)
            db.add(initiative)

        db.commit()
        print(f"✓ Se agregaron {len(new_initiatives)} iniciativas adicionales")

        # Mostrar el total
        all_initiatives = db.query(Initiative).all()
        print(f"\n📊 Total de iniciativas en la base de datos: {len(all_initiatives)}")

        # Contar por OP2
        from collections import Counter
        op2_count = Counter([init.op2 for init in all_initiatives])
        print("\nIniciativas por OP2:")
        for op2, count in sorted(op2_count.items()):
            print(f"  - {op2}: {count}")

    except Exception as e:
        db.rollback()
        print(f"❌ Error al agregar datos: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    print("🌱 Agregando iniciativas faltantes...")
    add_missing_initiatives()
