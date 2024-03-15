<?php
$converted_value = '';

//  if the form is submitted AND if the data is taken from the user
if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['from_value'])) {
    $from_value = $_GET['from_value'];
    $from_currency = $_GET['from_currency'];
    $to_currency = $_GET['to_currency'];
	// getting the values from the user

    $exchange_rates = [  
            'FUSD' => ['TUSD' => 1.0,'TEUR' => 0.92, 'TCAD' => 1.35],
            'FEUR' => ['TEUR' => 1.0,'TUSD' => 1.09, 'TCAD' => 1.47],
            'FCAD' => ['TCAD' => 1.0,'TUSD' => 0.74, 'TEUR' => 0.68]
    ];   // defining exchange rates in an associative array

	//if exchange rate fits the the selected currencies
    if (isset($exchange_rates[$from_currency][$to_currency])) {
        $rate = $exchange_rates[$from_currency][$to_currency];  
        $converted_value = $from_value * $rate; // calculate the converted value
        }
}

?>

<!DOCTYPE html>

<html lang="en">
<!-- Hasan Kayan 18050111055 - Selin Ergin 22050111075 -->
<head>
    <title>Currency Converter</title>
    <meta name="description" content="CENG311 Inclass Activity 4" />

</head>

<body>

	<form action = "activity4.php" method="GET">
		<table>
			<tr>
				<td for="from_value">From:</td>
				<td>
					<input type="text" name="from_value" value="<?php echo isset($_GET['from_value']) ? $_GET['from_value'] : ''; ?>"/>
				</td>
				<td>
					Currency:
				</td>
				<td>
					<select name="from_currency">
						<option value="FUSD" <?php echo isset($_GET['from_currency']) && $_GET['from_currency'] == 'FUSD' ? 'selected' : '';?>/> US Dollar </option>
						<option value="FCAD" <?php echo isset($_GET['from_currency']) && $_GET['from_currency'] == 'FCAD' ? 'selected' : '';?>/> Canadian Dollar </option>
						<option value="FEUR" <?php echo isset($_GET['from_currency']) && $_GET['from_currency'] == 'FEUR' ? 'selected' : '';?>/> Euro </option>
					</select>
				</td>	
			</tr>
			<tr>
                <td for="to_value">To (Converted Value):</td>
				<td>
					<input type="text" name="to_value" value="<?php echo number_format((float)$converted_value, 2, '.', ''); ?>" disabled/>
				</td>
				<td>
					Currency:
				</td>
				<td>
					<select name="to_currency">
						<option value="TUSD" <?php echo isset($_GET['to_currency']) && $_GET['to_currency'] == 'TUSD' ? 'selected' : '';?>/> US Dollar </option>
						<option value="TCAD" <?php echo isset($_GET['to_currency']) && $_GET['to_currency'] == 'TCAD' ? 'selected' : '';?>/> Canadian Dollar </option>
						<option value="TEUR" <?php echo isset($_GET['to_currency']) && $_GET['to_currency'] == 'TEUR' ? 'selected' : '';?>/> Euro </option>
					</select>
				</td>	
			</tr>
				<tr>
				<td>
					
				</td>
				<td>
					
				</td>
				<td>
					
				</td>
				<td>
					<input type="submit" value="convert"/>
				</td>
			</tr>
		</table>
		
	</form>
</body>