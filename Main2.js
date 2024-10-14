package ro.emanuel.oop.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

public class Main2 {
	
public static void main(String [] arg) throws SQLException {
		
		Properties connectionProps = new Properties();
		connectionProps.put("user", "root");
		connectionProps.put("password", "");
		
		Connection conn = DriverManager.getConnection(
				"jdbc:mysql://localhost:3306/oop2024",
				connectionProps);
		
		Statement stmt = conn.createStatement();
		
		//insert 
        int iid = 7;
		String iname = "Bianca";
		String isize = "M-L";
		double iprice = 55.99;
		
		String sqInsert = "insert into dresses (id, name, size, price) values(?,?,?,?)";
		PreparedStatement in = conn.prepareStatement(sqInsert);
		in.setInt(1, iid);
		in.setString(2, iname);
		in.setString(3, isize);
		in.setDouble(4, iprice);
		
		int rowsAff = in.executeUpdate();
		System.out.println(rowsAff);
		
		//update
		String update = "UPDATE dresses SET name = ? WHERE id = ? ";
		PreparedStatement up = conn.prepareStatement(update);
		up.setString(1, iname);
		up.setInt(2,8);
		up.executeUpdate();
		System.out.println("rows update");
		
		//delete
		String delete = "DELETE FROM dresses WHERE id = ?";
		PreparedStatement dl = conn.prepareStatement(delete);
		dl.setInt(1, 6);
		int result = dl.executeUpdate();
		dl.executeUpdate();
		System.out.println(result);
		
		final ResultSet rs = stmt.executeQuery("SELECT *FROM dresses ");
		while(rs.next()) {
			int id = rs.getInt("id");
			String name = rs.getString("name");
			String size = rs.getString("size");
			double price = rs.getDouble("price");
			
			System.out.println("==== Product Details ====");
			System.out.println("ID: " + id);
			System.out.println("Name: " + name);
			System.out.println("Size: " + size);
			System.out.println("Price: $" + price);
			System.out.println("=========================");
			
		}
		conn.close();
		

      }

}
