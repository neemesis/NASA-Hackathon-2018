<?php
require_once __DIR__.'/vendor/autoload.php';

use Tgallice\Wit\Client;

$client = new Client('ZXVS2OQO5PTF47HF2BQIC52YM7MTIXR6');

$response = $client->get('/message', [
    'q' => $_GET['query'],
]);

$intent = json_decode($response->getBody(), true);

// echo "<pre>";
// print_r($intent);
// die;

$response_array = [];

// "datetime": {
//         "to": {
//             "value": "2019-01-01T00:00:00.000-08:00",
//             "grain": "year"
//         },
//         "from": {
//             "value": "2017-01-01T00:00:00.000-08:00",
//             "grain": "year"
//         },
//         "type": "interval"
//     }

foreach ($intent['entities'] as $key => $entity) {
	if(array_key_exists('values', $entity[0]))
	{
		if(array_key_exists('value', $entity[0]))
		{
			// koga nema from-to, samo datum
			// $response_array[$key]['from'] = ['value' => $entity[0]['value']];
			$response_array[$key]['from'] = [
				'value' => '2017-10-21T00:00:00.000-07:00',
				'grain' => 'year'
			];
			$response_array[$key]['to'] = [
				'value' => '2019-01-01T00:00:00.000-08:00',
				'grain' => 'year'
			];
			$response_array['datetime']['type'] = "interval";
		}
		else
		{
			// from-to objekt
			$response_array[$key] = $entity[0]['values'][0];
		}
	}
	else
	{
		if($key == 'location')
		{
			$response_array[$key] = [
				'name' => $entity[0]['value'],
				'lon' => $entity[0]['resolved']['values'][0]['coords']['long'],
				'lat' => $entity[0]['resolved']['values'][0]['coords']['lat'],
			];
		}
		else
		{
			$response_array[$key] = $entity[0]['value'];
		}
	}
}

if(!array_key_exists('datetime', $intent['entities']))
{
	// $response_array['datetime'][0]['from'] = date('c');
	$response_array['datetime']['from'] = [
		'value' => $entity[0]['value']
	];
	$response_array['datetime']['to'] = ['value' => null];
	$response_array['datetime']['type'] = "interval";
}

// echo "<pre>";
// print_r($intent['entities']);
// die;

echo json_encode($response_array);
