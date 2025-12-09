import { BigQuery } from "@google-cloud/bigquery";

export async function GET() {
  try {
    const bigquery = new BigQuery({
      projectId: process.env.BIGQUERY_PROJECT_ID,
      credentials: {
        client_email: process.env.GCP_CLIENT_EMAIL,
        private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, "\n")
      },
    });

    const query = `
      SELECT
        start_station_name,
        end_station_name,
        tripduration
      FROM
        \`bigquery-public-data.new_york.citibike_trips\`
      LIMIT 10
    `;

    const [rows] = await bigquery.query({ query });

    return Response.json(rows);
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}


//perguntas brose:
//
// 
//
//
//
//
//
//
//