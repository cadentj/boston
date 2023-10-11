import csv
import json

# Load data from CSV file
filename = '/home/caden/Programming/boston/src/scripts/data_new.csv'
nodes = []

with open(filename, newline='', encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile)
    next(reader, None)  # Skip header row
    for row in reader:
        node = {
            'id': row[0],
            'name': row[1],
            'type': row[2],
            'desc': row[3],
            'links': []
        }
        for link_data in row[4:]:
            if link_data:
                link_parts = link_data.split(' ')
                link = {
                    'link_desc': ' '.join(link_parts[:-1]),
                    'id': link_parts[-1].strip('""')
                }
                node['links'].append(link)
        nodes.append(node)


final = {}

for val in node

# {
#         "id": "027",
#         "name": "displacement",
#         "type": "variable",
#         "desc": "When existing homeowners are forced to move from their residences due to increased demand in their neighborhoods.",
#         "links": [
#             {
#                 "link_desc": "direct relationship to",
#                 "id": "026"
#             }
#         ]
#     },

for 

# # Convert to JSON
# graph_json = json.dumps(nodes, indent=4)
# print(graph_json)
