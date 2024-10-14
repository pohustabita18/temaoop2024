package ro.emanuel.oop.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

public class Main {
	
public static void main(String [] arg) throws SQLException {
		
		Properties connectionProps = new Properties();
		connectionProps.put("user", "root");
		connectionProps.put("password", "");
		
		Connection conn = DriverManager.getConnection(
				"jdbc:mysql://localhost:3306/oop2024",
				connectionProps);
		
		Statement stmt = conn.createStatement();
		
		//insert
		int iid = 10;
		String iname = "Luminita";
		String iaddress = "Strada Vulturul Negru Nr.11, Iasi";
		
		String sqInsert = "insert into shop (id,name,address) values(?,?,?)";
		
		PreparedStatement ps = conn.prepareStatement(sqInsert);
		ps.setInt(1, iid);
		ps.setString(2, iname);
		ps.setString(3, iaddress);
		
		int rowsAff = ps.executeUpdate();
		System.out.println(rowsAff);

		
		
		//update 
		String update = "UPDATE shop SET address = ? WHERE id = ? ";
		PreparedStatement up = conn.prepareStatement(update);
		up.setString(1, iaddress);
		up.setInt(2,6);
		up.executeUpdate();
		System.out.println("rows update");
		
		//delete
		String delete = "DELETE FROM shop WHERE id >= ?";
		PreparedStatement dl = conn.prepareStatement(delete);
		dl.setInt(1, 7);
		int result = dl.executeUpdate();
		dl.executeUpdate();
		System.out.println(result);
		
		final ResultSet rs = stmt.executeQuery("SELECT *FROM shop");
		while(rs.next()) {
			int id = rs.getInt("id");
			String name = rs.getString("name");
			String address = rs.getString("address");
			
			System.out.println("[" + id + "] Name: " + name + " - Address: " + address);

		}
		conn.close();
     }
           
}
