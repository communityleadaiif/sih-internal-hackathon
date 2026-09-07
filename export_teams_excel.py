import urllib.request
import json
import csv
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

url = 'https://script.google.com/macros/s/AKfycbze3jE57qbhsPn00LHlPpgvt7GCKDlyw5dg-b5cFwZ9EmuyETeqDDodu90lwJJMQDYjwQ/exec'

print("Fetching registered teams from Google Apps Script...")
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
response = urllib.request.urlopen(req)
data = json.loads(response.read().decode('utf-8'))

teams = data.get('teams', [])
print(f"Total registered teams fetched: {len(teams)}")

# Create workbook
wb = openpyxl.Workbook()
ws = wb.active
ws.title = 'Teams, Leaders & Mentors'

# Title Row
ws.merge_cells('A1:J1')
title_cell = ws['A1']
title_cell.value = 'SIH 2026 INTERNAL HACKATHON - TEAMS, LEADERS & MENTORS DIRECTORY'
title_cell.font = Font(name='Calibri', size=14, bold=True, color='FFFFFF')
title_cell.fill = PatternFill(start_color='1E3A8A', end_color='1E3A8A', fill_type='solid')
title_cell.alignment = Alignment(horizontal='center', vertical='center')
ws.row_dimensions[1].height = 35

# Headers
headers = [
    'S.No', 'Team ID', 'Team Name', 'Team Leader Name', 'Mentor Name', 
    'Department', 'Leader Email', 'Leader Roll No', 'Category', 'Problem Statement ID & Title'
]

ws.append([]) # Row 2 empty spacer or header directly
ws.cell(row=2, column=1).value = ""
ws.row_dimensions[2].height = 8

ws.append(headers) # Row 3
header_row_idx = 3
ws.row_dimensions[header_row_idx].height = 28

# Styling for Headers
header_fill = PatternFill(start_color='00A859', end_color='00A859', fill_type='solid')
header_font = Font(name='Calibri', size=11, bold=True, color='FFFFFF')
header_alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)

thin_border = Border(
    left=Side(style='thin', color='D0D5DD'),
    right=Side(style='thin', color='D0D5DD'),
    top=Side(style='thin', color='D0D5DD'),
    bottom=Side(style='thin', color='D0D5DD')
)

for col_num in range(1, len(headers) + 1):
    cell = ws.cell(row=header_row_idx, column=col_num)
    cell.fill = header_fill
    cell.font = header_font
    cell.alignment = header_alignment
    cell.border = thin_border

alt_fill = PatternFill(start_color='F8FAFC', end_color='F8FAFC', fill_type='solid')

records_for_display = []

for idx, t in enumerate(teams, 1):
    members = t.get('members', [])
    leader = members[0] if members else {}
    leader_name = leader.get('name', 'N/A')
    leader_email = leader.get('email', 'N/A')
    leader_roll = str(leader.get('rollNo', 'N/A'))
    mentor_name = t.get('mentorName', 'Assigned Mentor')
    ps_id = t.get('problemStatementId', '')
    ps_title = t.get('psTitle1', '')
    ps_combined = f"[{ps_id}] {ps_title}" if ps_id else "N/A"
    team_id = t.get('id', f'SIH-TEAM-{idx:02d}')
    team_name = t.get('name', 'N/A')
    department = t.get('department', 'N/A')
    category = t.get('category', 'Software')

    records_for_display.append({
        'sno': idx,
        'team_id': team_id,
        'team_name': team_name,
        'leader_name': leader_name,
        'mentor_name': mentor_name,
        'department': department,
        'email': leader_email,
        'roll': leader_roll,
        'category': category,
        'ps': ps_combined
    })

    row_data = [
        idx,
        team_id,
        team_name,
        leader_name,
        mentor_name,
        department,
        leader_email,
        leader_roll,
        category,
        ps_combined
    ]
    ws.append(row_data)
    
    current_row = header_row_idx + idx
    ws.row_dimensions[current_row].height = 22
    for col_idx in range(1, len(headers) + 1):
        c = ws.cell(row=current_row, column=col_idx)
        c.border = thin_border
        c.font = Font(name='Calibri', size=10)
        if idx % 2 == 0:
            c.fill = alt_fill
        if col_idx in [1, 2, 8, 9]:
            c.alignment = Alignment(horizontal='center', vertical='center')
        else:
            c.alignment = Alignment(horizontal='left', vertical='center')

# Adjust column widths
for col in ws.columns:
    max_len = 0
    col_letter = get_column_letter(col[0].column)
    for cell in col:
        if cell.row < 3: # Skip title
            continue
        val = str(cell.value or '')
        if len(val) > max_len:
            max_len = len(val)
    ws.column_dimensions[col_letter].width = min(max(max_len + 4, 12), 48)

excel_filename = 'SIH_2026_Teams_Leaders_Mentors.xlsx'
wb.save(excel_filename)
print(f"Excel file created: {excel_filename}")

# Export CSV as well
csv_filename = 'SIH_2026_Teams_Leaders_Mentors.csv'
with open(csv_filename, 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(headers)
    for r in records_for_display:
        writer.writerow([
            r['sno'], r['team_id'], r['team_name'], r['leader_name'],
            r['mentor_name'], r['department'], r['email'], r['roll'],
            r['category'], r['ps']
        ])
print(f"CSV file created: {csv_filename}")

# Print JSON summary for output formatting
summary_file = 'teams_summary.json'
with open(summary_file, 'w', encoding='utf-8') as f:
    json.dump(records_for_display, f, indent=2)
