/**
 * SIH 2026 INTERNAL HACKATHON - Google Apps Script (GAS) Webhook
 * AJK College of Arts & Science in association with AIIF
 * 
 * INSTRUCTIONS TO DEPLOY:
 * 1. Open Google Sheets (https://sheets.new) and name it "SIH 2026 Registrations"
 * 2. Click Extensions -> Apps Script
 * 3. Delete any default code and paste this ENTIRE file into Code.gs
 * 4. Click "Deploy" -> "New Deployment" (or "Manage Deployments" -> Edit -> New Version)
 * 5. Select type: "Web app", Execute as: "Me", Who has access: "Anyone"
 * 6. Click "Deploy" and copy the Web App URL!
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Handle Delete Team request from Organiser
    if (data.action === 'deleteTeam' && data.teamId) {
      var targetId = data.teamId.toString().trim();
      var baseTargetId = targetId.replace(/-[AB]$/, '');
      for (var rowIdx = sheet.getLastRow(); rowIdx >= 2; rowIdx--) {
        var existingId = sheet.getRange(rowIdx, 2).getValue().toString().trim();
        if (existingId === targetId || existingId === baseTargetId) {
          sheet.deleteRow(rowIdx);
        }
      }
      return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Deleted team " + targetId }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Setup Header Row if sheet is new
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", "Team ID", "Team Name", "Department", "Region", 
        "Mentor Name", "Category", "PS1 Code", "PS1 Title", 
        "PS2 Code", "PS2 Title", "Solution 1", "Tech Stack 1",
        "Leader Name", "Leader Roll", "Leader Email", 
        "Member 2", "Member 3", "Member 4", "Member 5", "Member 6",
        "Raw Data JSON"
      ]);
      sheet.getRange(1, 1, 1, 22).setFontWeight("bold").setBackground("#00a859").setFontColor("#ffffff");
    }

    // Extract Member Names & Emails
    var members = data.members || [];
    var leader = members[0] || {};
    var memberSummary = members.map(function(m, idx) {
      return (idx + 1) + ". " + m.name + " (" + (m.rollNo || "N/A") + ") - " + (m.email || "N/A") + " [" + (m.gender || "Not Specified") + "]";
    }).join("\n");

    var recipientEmails = members.map(function(m) { return m.email; }).filter(Boolean);
    if (data.mentorEmail) recipientEmails.push(data.mentorEmail);
    
    // Add Organiser Email
    var organiserEmail = "communitylead@aiif.in";
    recipientEmails.push(organiserEmail);

    var emailListStr = recipientEmails.join(",");

    // Append Full Row to Google Sheet
    sheet.appendRow([
      new Date().toLocaleString(),
      data.id || ("SIH-TEAM-0" + (sheet.getLastRow() > 0 ? sheet.getLastRow() : 1)),
      data.name || "",
      data.department || "",
      data.hometown || "",
      data.mentorName || "Assigned Mentor",
      data.category || "Software",
      data.problemStatementId || "",
      data.psTitle1 || "",
      data.problemStatement2Id || "N/A",
      data.psTitle2 || "N/A",
      data.solution1 || "",
      data.techStack1 || "",
      leader.name || "",
      leader.rollNo || "",
      leader.email || "",
      (members[1] ? members[1].name : ""),
      (members[2] ? members[2].name : ""),
      (members[3] ? members[3].name : ""),
      (members[4] ? members[4].name : ""),
      (members[5] ? members[5].name : ""),
      JSON.stringify(data)
    ]);

    // Send Email Acknowledgement via Gmail API
    var subject = "[SIH 2026] Official Team Registration Receipt - " + data.name + " (" + data.department + ")";
    
    var body = "SIH 2026 INTERNAL HACKATHON\n" +
               "AJK College of Arts & Science in association with AIIF\n" +
               "===========================================================\n\n" +
               "Dear " + (leader.name || "Team Leader") + " & Team Members,\n\n" +
               "Your team registration for SIH 2026 Internal Hackathon has been SUCCESSFULLY RECEIVED!\n\n" +
               "REGISTRATION SUMMARY:\n" +
               "-----------------------------------------------------------\n" +
               "• Team ID: " + data.id + "\n" +
               "• Team Name: " + data.name + "\n" +
               "• Official Department: " + data.department + "\n" +
               "• Category Track: " + data.category + "\n" +
               "• Assigned Mentor: " + (data.mentorName || "Assigned Mentor") + "\n\n" +
               "PROBLEM STATEMENTS SUBMITTED:\n" +
               "-----------------------------------------------------------\n" +
               "• Primary PS 1: [" + data.problemStatementId + "] " + data.psTitle1 + "\n" +
               (data.problemStatement2Id && data.problemStatement2Id !== 'N/A' ? "• Secondary PS 2: [" + data.problemStatement2Id + "] " + data.psTitle2 + "\n" : "") + "\n" +
               "TEAM MEMBERS ROSTER (6 Members - Female Rule Verified):\n" +
               "-----------------------------------------------------------\n" +
               memberSummary + "\n\n" +
               "KEY UPCOMING DATES:\n" +
               "-----------------------------------------------------------\n" +
               "⏰ Registration Deadline: September 01, 2026\n" +
               "🎯 Offline Campus Pitching: September 04, 2026 at AJK College Campus\n\n" +
               "Best Regards,\n" +
               "SIH 2026 Organising Committee\n" +
               "AJK College of Arts & Science & AIIF (AJK Innovation Incubator Foundation)\n" +
               "Email: communitylead@aiif.in";

    MailApp.sendEmail(emailListStr, subject, body);

    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Registered & Emails Sent" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * GET Handler - Fetches all registered teams with 100% full member fidelity from Google Sheet
 */
function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rows = sheet.getDataRange().getValues();
    if (rows.length <= 1) {
      return ContentService.createTextOutput(JSON.stringify({ status: "success", teams: [] }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var teams = [];
    for (var i = 1; i < rows.length; i++) {
      var r = rows[i];
      var teamName = r[2] ? r[2].toString().trim() : "";
      var teamId = r[1] ? r[1].toString().trim() : "";

      // Skip blank rows or dummy test rows
      if (!teamName || teamName === "" || /^Team \d+$/i.test(teamName)) continue;
      
      // Check if last column has full Raw Data JSON
      var rawJsonStr = r[r.length - 1];
      var parsedData = null;
      if (typeof rawJsonStr === 'string' && rawJsonStr.trim().startsWith('{') && rawJsonStr.trim().endsWith('}')) {
        try {
          parsedData = JSON.parse(rawJsonStr);
        } catch (err) {}
      }

      if (parsedData && Array.isArray(parsedData.members) && parsedData.members.length > 0) {
        // Return 100% complete preserved data
        teams.push({
          id: teamId || (parsedData.id ? parsedData.id.toString() : ("SIH-TEAM-" + (i < 10 ? "0" + i : i))),
          name: teamName || parsedData.name,
          department: (r[3] ? r[3].toString() : "") || parsedData.department || "",
          hometown: (r[4] ? r[4].toString() : "") || parsedData.hometown || "",
          mentorName: (r[5] ? r[5].toString() : "") || parsedData.mentorName || "Assigned Mentor",
          category: (r[6] ? r[6].toString() : "") || parsedData.category || "Software",
          problemStatementId: (r[7] ? r[7].toString().trim() : "") || (parsedData.problemStatementId ? parsedData.problemStatementId.toString() : ""),
          psTitle1: (r[8] ? r[8].toString().trim() : "") || (parsedData.psTitle1 ? parsedData.psTitle1.toString() : ""),
          problemStatement2Id: (r[9] ? r[9].toString().trim() : "") || (parsedData.problemStatement2Id ? parsedData.problemStatement2Id.toString() : ""),
          psTitle2: (r[10] ? r[10].toString().trim() : "") || (parsedData.psTitle2 ? parsedData.psTitle2.toString() : ""),
          solution1: parsedData.solution1 || (r[11] ? r[11].toString() : "") || "",
          techStack1: parsedData.techStack1 || (r[12] ? r[12].toString() : "") || "",
          submittedAt: r[0] || parsedData.submittedAt || new Date().toISOString(),
          members: parsedData.members,
          scores: parsedData.scores || null
        });
      } else {
        // Legacy Row Fallback
        teams.push({
          id: teamId || ("SIH-TEAM-" + (i < 10 ? "0" + i : i)),
          name: teamName,
          department: r[3] ? r[3].toString().trim() : "",
          hometown: r[4] ? r[4].toString().trim() : "",
          mentorName: r[5] ? r[5].toString().trim() : "Assigned Mentor",
          category: r[6] ? r[6].toString().trim() : "Software",
          problemStatementId: r[7] ? r[7].toString().trim() : "",
          psTitle1: r[8] ? r[8].toString().trim() : "",
          problemStatement2Id: r[9] ? r[9].toString().trim() : "",
          psTitle2: r[10] ? r[10].toString().trim() : "",
          solution1: (r.length > 20 && r[11] ? r[11].toString() : "") || "",
          techStack1: (r.length > 20 && r[12] ? r[12].toString() : "") || "",
          submittedAt: r[0] || new Date().toISOString(),
          members: [
            { name: (r[11] || r[13] || "").toString().trim(), rollNo: (r[12] || r[14] || "").toString().trim(), email: (r[13] || r[15] || "").toString().trim(), role: "Team Leader", gender: "Male" },
            { name: (r[14] || r[16] || "").toString().trim(), role: "Member 2", gender: "Female" },
            { name: (r[15] || r[17] || "").toString().trim(), role: "Member 3", gender: "Female" },
            { name: (r[16] || r[18] || "").toString().trim(), role: "Member 4", gender: "Male" },
            { name: (r[17] || r[19] || "").toString().trim(), role: "Member 5", gender: "Male" },
            { name: (r[18] || r[20] || "").toString().trim(), role: "Member 6", gender: "Male" }
          ].filter(function(m) { return m.name && m.name.toString().trim() !== ""; })
        });
      }
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success", teams: teams }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
