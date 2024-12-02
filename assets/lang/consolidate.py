import json

# Load JSON files
def load_json(filename):
    with open(filename, 'r') as file:
        return json.load(file)

# Save consolidated JSON to file
def save_json(filename, data):
    with open(filename, 'w') as file:
        json.dump(data, file, indent=4)

def consolidate_json(initial_data, updated_data):
    consolidated_data = initial_data.copy()
    
    for key, value in updated_data.items():
        # Update with the new value if the key exists, or add if it's new
        consolidated_data[key] = value

    return consolidated_data

if __name__ == "__main__":
    initial_data = load_json('en.json')
    updated_data = load_json('localization.json')
    
    consolidated_result = consolidate_json(initial_data, updated_data)
    
    save_json('consolidated.json', consolidated_result)
    print("Consolidation complete! Saved to 'consolidated.json'.")
