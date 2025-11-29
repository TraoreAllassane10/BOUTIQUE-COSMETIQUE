<?php

namespace App\Listeners;

use App\Events\CommandeRegisteredEvent;
use App\Notifications\CommandeClientRegisteredNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class CommandeRegisteredListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(CommandeRegisteredEvent $event): void
    {
     
    }
}
