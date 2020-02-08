<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use \Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function contacts(Request $request)
    {
        $perPage = 2;
        $page = $request->get('page', 1);
        $offset = $perPage * ($page - 1);

        $sort_field = $request->get('sort_field', 'id');
        $descending = $request->get('sort_direction', 'asc') === 'desc';

        $data_path = database_path('data.json');
        $data = json_decode(file_get_contents($data_path, true));

        $contact_collection = collect($data)
            ->flatMap(function ($item) {
                return current($item);
            })
            ->where('isActive', true)
            ->sortBy($sort_field, SORT_REGULAR, $descending)
            ->slice($offset, $perPage);

        return response()->json($contact_collection->values());
    }
}
